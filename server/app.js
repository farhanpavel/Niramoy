import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import axios from "axios";
import blogRouter from "./routes/blogRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000; // Default PORT if not in .env
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD4tJ9Gk9WFr7iTDZfeoP7aJcXynglhDVM";

import { PrismaClient } from "@prisma/client";
import {
  pushToDB,
  updateDietPlan,
  updateExercises,
} from "./module/db-helper.js";
import promptRouter from "./routes/promptRoute.js";
import dateRouter from "./routes/dateRoute.js";
const prisma = new PrismaClient();

// Test Route
app.get("/", (req, res) => {
  return res.send("Hello, the server is running!");
});

// Helper Function to Read JSON Templates
const getTemplateJson = (fileName) => {
  if (fileName === "exercise_template.json") {
    return `{
      "exercise": {
        "id": "BIGINT PRIMARY KEY",
        "name": "VARCHAR(255)",
        "description": "TEXT. 200 words",
        "muscle_groups": [{"name": "VARCHAR(255)"}],
        "equipment": [{"name": "VARCHAR(255)"}],
        "steps": [{"step_number": "INT", "instruction": "TEXT"}],
        "category": "VARCHAR(100)",
        "difficulty_level": "VARCHAR(50)",
        "duration_minutes": "INT",
     
      }
    }`;
  }
  if (fileName === "meal.json") {
    return ` "meals": {
      "breakfast": {
        "items": "TEXT",
        "recipe_description": "TEXT. 200 words recipe guide",
        "youtube_link": "VARCHAR(255)"
      },
      "lunch": {
        "items": "TEXT",
        "recipe_description": "TEXT. 200 words recipe guide",
        "youtube_link": "VARCHAR(255)"
      },
      "dinner": {
        "items": "TEXT",
        "recipe_description": "TEXT. 200 words recipe guide",
        "youtube_link": "VARCHAR(255)"
      }
    }`;
  }

  if (fileName === "recipe_template.json") {
    return `{
      "recipe": {
        "name": "VARCHAR(255)",
        "description": "TEXT. 200 words",
        "ingredients": [{"name": "VARCHAR(255)", "quantity": "VARCHAR(50)"}],
        "steps": [{"step_number": "INT", "instruction": "TEXT"}],
        "category": "VARCHAR(100)",
        "prep_time_minutes": "INT",
        "cook_time_minutes": "INT",
        "total_time_minutes": "INT",
        "servings": "INT",
        "nutrition_facts": {
          "calories": "INT",
          "protein_g": "FLOAT",
          "fat_g": "FLOAT",
          "carbohydrates_g": "FLOAT"
        }
      }
    }`;
  }

  if (fileName === "template.json") {
    return `{
      "ai_response": [{
        "id": "BIGINT PRIMARY KEY",
        "conversation_id": "BIGINT FOREIGN KEY REFERENCES Conversations(id)",
        "content": "TEXT",
        "created_at": "TIMESTAMP"
      }],
      "exercises": [{
        "id": "BIGINT PRIMARY KEY",
        "name": "VARCHAR(255)",
        "description": "TEXT. 200 words",
        "category": "VARCHAR(100)",
        "duration_minutes": "INT",
        "youtube_link": "VARCHAR(255)"
      }],
      "diet_plan": {
        "id": "BIGINT PRIMARY KEY",
        "name": "VARCHAR(255)",
        "description": "TEXT. 200 words",
        "calorie_target": "INT",
        "meals": {
          "breakfast": {
            "items": "TEXT",
            "recipe_description": "TEXT. 200 words recipe guide",
            "youtube_link": "VARCHAR(255)"
          },
          "lunch": {
            "items": "TEXT",
            "recipe_description": "TEXT. 200 words recipe guide",
            "youtube_link": "VARCHAR(255)"
          },
          "dinner": {
            "items": "TEXT",
            "recipe_description": "TEXT. 200 words recipe guide",
            "youtube_link": "VARCHAR(255)"
          }
        }
      }
    }`;
  }
  return null;
};

// Generalized Function to Handle AI Prompt
const handleAiPrompt = async (prompt, id, templateName) => {
  const templateJson = getTemplateJson(templateName);
  if (!templateJson) return null;

  const promptBuilder = [
    prompt,
    `Please provide a response in a structured JSON format (ans should in be bangla & keys as in said format) that matches the following model:`,
    templateJson,
    `Ensure that all YouTube links provided are valid and accessible. Do not include placeholder or unavailable links. Each link must correspond to real, publicly available YouTube videos.`,
  ].join(" ");

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: promptBuilder.trim(),
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    // Extract and clean the response
    const rawResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    // console.log("AI Raw Response:", rawResponse);
    const cleanedResponse = rawResponse
      .replace(/```json\s*/g, "")
      .replace(/```/g, "")
      .trim();

    let responseJson = JSON.parse(cleanedResponse);

    // Enrich with valid YouTube links
    responseJson = await enrichWithYouTubeLinks(responseJson);
    console.log(responseJson);
    // Push to the database
    await pushToDB(responseJson, id, templateName);

    return responseJson;
  } catch (error) {
    console.error(
      "Error in AI API request:",
      error.response?.data || error.message
    );
    return { error: "Error processing AI response. Please check the logs." };
  }
};
// For Update
const anotherAiPrompt = async (prompt, id, templateName) => {
  console.log("Template Name:", templateName);

  const templateJson = getTemplateJson(templateName);
  if (!templateJson) {
    console.error("No template found for the given template name.");
    return null;
  }

  const promptBuilder = [
    prompt,
    `Please provide a response in a structured JSON format (ans should be in Bangla & keys as in the given template):`,
    templateJson,
  ].join(" ");

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: promptBuilder.trim(),
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });

    // Log raw response for debugging
    const rawResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Remove unwanted characters and ensure the response looks like JSON
    const cleanedResponse = rawResponse
      .replace(/```json\s*/g, "")
      .replace(/```/g, "")
      .trim();

    // Check if cleaned response looks like valid JSON
    try {
      let responseJson = JSON.parse(cleanedResponse);

      // Push to the database
      if (templateName == "exercise_template.json") {
        responseJson = await enrichWithYouTubeLinksForExercise(responseJson);
        await updateExercises(responseJson, id, templateName);
      } else if (templateName == "meal.json") {
        responseJson = await enrichWithYouTubeLinksForDiet(responseJson);
        await updateDietPlan(responseJson, id, templateName);
      }
      console.log("Parsed AI Response:", responseJson);
      return responseJson;
    } catch (err) {
      console.error("Error parsing AI JSON:", err);
      return { error: "Failed to parse AI response." };
    }
  } catch (error) {
    console.error(
      "Error in AI API request:",
      error.response?.data || error.message
    );
    return { error: "Error processing AI response. Please check the logs." };
  }
};
const enrichWithYouTubeLinksForExercise = async (responseJson) => {
  // Helper function to fetch YouTube link for a given query
  const replaceLinks = async (text) => {
    const query = text.split(".")[0]; // Simplified query extraction
    console.log("YouTube Query:", query); // Log the query
    const link = await fetchYouTubeLink(query);
    return link || "https://www.youtube.com"; // Fallback link
  };

  // Check if responseJson is an array and iterate over it
  if (Array.isArray(responseJson)) {
    // Iterate over the array of exercises (even if there's only one)
    for (const item of responseJson) {
      const exercise = item.exercise;
      if (exercise && exercise.name) {
        exercise.youtube_link = await replaceLinks(exercise.name); // Assign YouTube link for each exercise
      }
    }
  } else if (responseJson.exercise) {
    // If it's a single exercise, handle it directly
    const exercise = responseJson.exercise;
    if (exercise.name) {
      exercise.youtube_link = await replaceLinks(exercise.name); // Assign YouTube link for single exercise
    }
  } else {
    console.error("No valid exercises found in response:", responseJson);
  }

  return responseJson; // Return enriched response
};
const enrichWithYouTubeLinksForDiet = async (responseJson) => {
  // Helper function to fetch YouTube link for a given query
  const replaceLinks = async (text) => {
    const query = text.split(",")[0].trim(); // Simplified query extraction using first item
    console.log("YouTube Query:", query); // Log the query
    const link = await fetchYouTubeLink(query); // Replace this with your API logic
    return link || "https://www.youtube.com"; // Fallback link
  };

  // Check if meals object exists and is valid
  if (responseJson.meals && typeof responseJson.meals === "object") {
    for (const mealType of Object.keys(responseJson.meals)) {
      const meal = responseJson.meals[mealType];
      if (meal.items) {
        // Generate YouTube link based on meal items
        meal.youtube_link = await replaceLinks(meal.items);
      }
    }
  } else {
    console.error("Invalid meals data in responseJson:", responseJson);
  }

  return responseJson; // Return enriched responseJson with YouTube links
};

const enrichWithYouTubeLinks = async (responseJson) => {
  const replaceLinks = async (text) => {
    const query = text.split(".")[0]; // Simplified query extraction
    const link = await fetchYouTubeLink(query);
    return link || "https://www.youtube.com"; // Fallback link
  };

  if (responseJson.exercises) {
    for (const exercise of responseJson.exercises) {
      exercise.youtube_link = await replaceLinks(exercise.name); // Assign YouTube link
    }
  }

  if (responseJson.diet_plan && responseJson.diet_plan.meals) {
    const meals = responseJson.diet_plan.meals;
    for (const [mealType, meal] of Object.entries(meals)) {
      if (meal.recipe_description) {
        meal.youtube_link = await replaceLinks(meal.recipe_description); // Assign YouTube link
      }
    }
  }

  return responseJson;
};

const fetchYouTubeLink = async (query) => {
  console.log("Fetching YouTube link for query:", query); // Log the query
  const options = {
    method: "GET",
    url: `https://yt-api.p.rapidapi.com/search?query=${encodeURIComponent(
      query
    )}`,
    headers: {
      "x-rapidapi-key": "80b8e7c34bmsh1f0bfbf85488416p17102ajsn7b6fecce7b54",
      "x-rapidapi-host": "yt-api.p.rapidapi.com",
    },
  };

  try {
    const { data } = await axios.request(options);
    const video = data.data.find((item) => item.type === "video");
    const link = video
      ? `https://www.youtube.com/watch?v=${video.videoId}`
      : null;
    console.log("Fetched YouTube link:", link); // Log the fetched link
    return link;
  } catch (error) {
    console.error("Error fetching YouTube link:", error.message);
    return null;
  }
};

// Test function

// Routes
app.post("/ai/niramoy", async (req, res) => {
  const { prompt, id } = req.body;
  const promptResult = await prisma.prompt.create({
    data: {
      user_id: id,
      description: prompt,
    },
  });
  const result = await handleAiPrompt(prompt, id, "template.json");
  res.json(result || { error: "Error processing AI response" });
});

app.post("/ai/recipe", async (req, res) => {
  const { prompt } = req.body;
  const result = await handleAiPrompt(prompt, "recipe_template.json");
  res.json(result || { error: "Error processing AI response" });
});

app.post("/ai/exercise", async (req, res) => {
  const { prompt } = req.body;
  const result = await handleAiPrompt(prompt, "exercise_template.json");
  res.json(result || { error: "Error processing AI response" });
});

// Get Latest AI Response
app.get("/latest/:id", async (req, res) => {
  try {
    const response = await prisma.response.findFirst({
      where: {
        user_id: req.params.id,
      },
      orderBy: { created_at: "desc" },
      include: {
        ai_response: true,
        exercises: true, // Include exercises with YouTube links
        diet_plan: { include: { meals: true } }, // Include meals with YouTube links
      },
    });

    if (response) {
      res.json(response);
    } else {
      res.json({ message: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching latest response:", error.message);
    res.status(500).json({ error: "Error fetching latest response" });
  }
});
app.put("/ai/exercise", async (req, res) => {
  const { prompt, userId } = req.body; // Extract prompt and userId from the request body

  try {
    const result = await anotherAiPrompt(
      prompt,
      userId,
      "exercise_template.json"
    );

    if (result?.error) {
      return res.status(500).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating exercises:", error);
    res
      .status(500)
      .json({ error: "Error processing AI response. Please check the logs." });
  }
});
app.put("/ai/nutrion", async (req, res) => {
  const { prompt, userId } = req.body; // Extract prompt and userId from the request body

  try {
    const result = await anotherAiPrompt(prompt, userId, "meal.json");

    if (result?.error) {
      return res.status(500).json({ error: result.error });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating exercises:", error);
    res
      .status(500)
      .json({ error: "Error processing AI response. Please check the logs." });
  }
});

// Routers
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/prompt", promptRouter);
app.use("/api/date", dateRouter);
// Start Server
app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
