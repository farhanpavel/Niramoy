import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import cors from "cors";
import axios from "axios";
import blogRouter from "./routes/blogRoute.js";

const app = express();
app.use(cors());
const PORT = process.env.PORT;
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD4tJ9Gk9WFr7iTDZfeoP7aJcXynglhDVM";

app.use(express.json());
app.get("/", (req, res) => {
  return res.send("hello");
});

app.listen(PORT, () => {
  console.log(`app is listening on Port ${PORT}`);
});

// AI CODES
// Helper function to read JSON templates
const getTemplateJson = (fileName) => {
  if (fileName === "exercise_template.json")
    return (
      "{\n" +
      '  "exercise": {\n' +
      '    "id": "BIGINT PRIMARY KEY",\n' +
      '    "name": "VARCHAR(255)",\n' +
      '    "description": "TEXT. 200 words",\n' +
      '    "muscle_groups": [\n' +
      "      {\n" +
      '        "name": "VARCHAR(255)"\n' +
      "      }\n" +
      "    ],\n" +
      '    "equipment": [\n' +
      "      {\n" +
      '        "name": "VARCHAR(255)"\n' +
      "      }\n" +
      "    ],\n" +
      '    "steps": [\n' +
      "      {\n" +
      '        "step_number": "INT",\n' +
      '        "instruction": "TEXT"\n' +
      "      }\n" +
      "    ],\n" +
      '    "category": "VARCHAR(100)",\n' +
      '    "difficulty_level": "VARCHAR(50)",\n' +
      '    "duration_minutes": "INT"\n' +
      "  }\n" +
      "}"
    );

  if (fileName === "recipe_template.json")
    return (
      "{\n" +
      '  "recipe": {\n' +
      '    "name": "VARCHAR(255)",\n' +
      '    "description": "TEXT. 200 words",\n' +
      '    "ingredients": [\n' +
      "      {\n" +
      '        "name": "VARCHAR(255)",\n' +
      '        "quantity": "VARCHAR(50)"\n' +
      "      }\n" +
      "    ],\n" +
      '    "steps": [\n' +
      "      {\n" +
      '        "step_number": "INT",\n' +
      '        "instruction": "TEXT"\n' +
      "      }\n" +
      "    ],\n" +
      '    "category": "VARCHAR(100)",\n' +
      '    "prep_time_minutes": "INT",\n' +
      '    "cook_time_minutes": "INT",\n' +
      '    "total_time_minutes": "INT",\n' +
      '    "servings": "INT",\n' +
      '    "nutrition_facts": {\n' +
      '      "calories": "INT",\n' +
      '      "protein_g": "FLOAT",\n' +
      '      "fat_g": "FLOAT",\n' +
      '      "carbohydrates_g": "FLOAT"\n' +
      "    }\n" +
      "  }\n" +
      "}"
    );

  if (fileName === "template.json")
    return (
      "{\n" +
      '  "ai_response": [{\n' +
      '    "id": "BIGINT PRIMARY KEY",\n' +
      '    "conversation_id": "BIGINT FOREIGN KEY REFERENCES Conversations(id)",\n' +
      '    "content": "TEXT",\n' +
      '    "created_at": "TIMESTAMP"\n' +
      "  }],\n" +
      '  "exercises": [{\n' +
      '    "id": "BIGINT PRIMARY KEY",\n' +
      '    "name": "VARCHAR(255)",\n' +
      '    "description": "TEXT. 200 words",\n' +
      '    "category": "VARCHAR(100)",\n' +
      '    "duration_minutes": "INT"\n' +
      "  }],\n" +
      '  "diet_plan": {\n' +
      '    "id": "BIGINT PRIMARY KEY",\n' +
      '    "name": "VARCHAR(255)",\n' +
      '    "description": "TEXT. 200 words",\n' +
      '    "calorie_target": "INT",\n' +
      '    "meals": {\n' +
      '      "breakfast": {\n' +
      '        "items": "TEXT",\n' +
      '        "recipe_description":  "TEXT. 200 words recipe guide"\n' +
      "      },\n" +
      '      "lunch":{\n' +
      '        "items": "TEXT",\n' +
      '        "recipe_description":  "TEXT. 200 words recipe guide"\n' +
      "      },\n" +
      '      "dinner": {\n' +
      '        "items": "TEXT",\n' +
      '        "recipe_description":  "TEXT. 200 words recipe guide"\n' +
      "      }\n" +
      "    }\n" +
      "  }\n" +
      "}"
    );
};

// Generalized function to handle AI prompt
const handleAiPrompt = async (prompt, templateName) => {
  const templateJson = getTemplateJson(templateName)?.replace(/"/g, '\\"');
  if (!templateJson) return null;

  const promptBuilder = [
    prompt,
    `Please provide a response in a structured JSON format (values in Bangla language, keys as in said format) that matches the following model:`,
    templateJson,
    `Make sure no YouTube link is an example link or "defined_your_yt_link". It must be a real YouTube link.`,
  ].join(" ");

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: promptBuilder,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(API_URL, requestBody, {
      headers: { "Content-Type": "application/json" },
    });
    const jsonResponse =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return jsonResponse.replace("```json\n", "").replace("\n```", "");
  } catch (error) {
    console.error(
      "Error in AI API request:",
      error.response?.data || error.message
    );
    return null;
  }
};

// Routes
app.post("/ai/niramoy", async (req, res) => {
  const { prompt } = req.body;
  const result = await handleAiPrompt(prompt, "template.json");
  res.send(result || "Error processing AI response");
});

app.post("/ai/recipe", async (req, res) => {
  const { prompt } = req.body;
  const result = await handleAiPrompt(prompt, "recipe_template.json");
  res.send(result || "Error processing AI response");
});

app.post("/ai/exercise", async (req, res) => {
  const { prompt } = req.body;
  const result = await handleAiPrompt(prompt, "exercise_template.json");
  res.send(result || "Error processing AI response");
});

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
