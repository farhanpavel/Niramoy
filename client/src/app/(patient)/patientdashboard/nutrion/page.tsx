"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sun, Moon, Cloud } from "lucide-react"; // Importing icons from lucide-react
import Cookies from "js-cookie";

// Define types for the diet plan and meals
type Meal = {
  id: number;
  dietPlanId: number;
  user_id: string;
  type: string;
  items: string;
  recipe_description: string;
  youtube_link: string | null;
};

type DietPlan = {
  name: string;
  description: string;
  calorie_target: number;
  meals: Meal[];
};

const AIPromptPage: React.FC = () => {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const id = Cookies.get("id");
  const [nutrition, setNutrition] = useState<string[]>([]); // Changed from nutrion to nutrition
  const [prompt, setPrompt] = useState<string>("");

  const regenerateNutrition = async () => {
    try {
      const response = await axios.put("http://localhost:4000/ai/nutrion", {
        prompt: prompt,
        userId: id,
      });

      setNutrition(response.data.nutrition); // Assuming response.data.nutrition holds nutrition data
    } catch (error) {
      console.error("Error regenerating nutrition:", error);
    }
  };

  // Fetch the prompt for the user
  const fetchPrompt = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/prompt/${id}`);
      setPrompt(response.data.description || ""); // Assuming response.data.description holds the prompt
    } catch (error) {
      console.error("Error fetching prompt:", error);
    }
  };

  // Fetch the diet plan for the user
  const fetchDietPlan = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/latest/${id}`);
      setDietPlan(response.data.diet_plan); // Assuming response.data.diet_plan holds the diet plan data
    } catch (error) {
      console.error("Error fetching diet plan:", error);
    }
  };

  // Check and regenerate nutrition if needed
  const checkAndRegenerateNutrition = async () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    const lastSavedDate = localStorage.getItem("lastSavedDate");

    if (lastSavedDate !== currentDate) {
      console.log("Updating nutrition for today:", currentDate);

      await regenerateNutrition();

      localStorage.setItem("lastSavedDate", currentDate);
    } else {
      console.log("Nutrition already updated for today.");
    }
  };

  useEffect(() => {
    fetchPrompt();
    fetchDietPlan();

    checkAndRegenerateNutrition();
  }, []);

  // Get appropriate icon for each meal type
  const getIcon = (type: string) => {
    switch (type) {
      case "breakfast":
        return <Sun className="w-6 h-6" />;
      case "lunch":
        return <Cloud className="w-6 h-6" />;
      case "dinner":
        return <Moon className="w-6 h-6" />;
      default:
        return null;
    }
  };

  if (!dietPlan) {
    return <div>Loading...</div>; // Show loading message until diet plan is fetched
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <Image
        src="/images/logo.png"
        height={100}
        width={100}
        alt="AI Logo"
        className="mb-5"
      />
      <h1 className="text-2xl font-bold text-center mb-5">
        সুস্থ দেহ, সুস্থ মন: পুষ্টির মাধ্যমে সঠিক পথ অনুসরণ করুন
      </h1>
      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-3">{dietPlan.name}</h2>
        <p className="mb-3">{dietPlan.description}</p>
        <div className="flex flex-wrap gap-4 p-4">
          <div
            className="flex items-center gap-2 px-4 py-2 text-primary bg-white border border-primary rounded-full shadow"
            style={{ borderColor: "#E81046", color: "#E81046" }}
          >
            <span className="text-sm font-medium">
              Calorie Target: {dietPlan.calorie_target}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dietPlan.meals.length > 0 ? (
            dietPlan.meals.map((meal) => (
              <div
                key={meal.id}
                className="bg-gray-50 p-4 rounded-lg shadow border-2 border-[#E81046] text-black hover:bg-[#E81046] hover:text-white hover:border-0 transition duration-300"
              >
                <div className="flex items-center mb-2">
                  {getIcon(meal.type)}
                  <h3 className="text-lg font-bold capitalize ml-2">
                    {meal.type}
                  </h3>
                </div>
                {meal.youtube_link && (
                  <div className="mt-2 rounded-lg overflow-hidden shadow-md">
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${new URL(
                        meal.youtube_link
                      ).searchParams.get("v")}`}
                      title={meal.name}
                      frameBorder="0"
                      allowFullScreen
                      className="transition duration-300 hover:scale-105"
                    ></iframe>
                  </div>
                )}
                <p className="mb-2 mt-4">
                  <strong>Items:</strong> {meal.items}
                </p>
                <p>
                  <strong>Recipe:</strong> {meal.recipe_description}
                </p>
              </div>
            ))
          ) : (
            <p>No meals available for this diet plan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPromptPage;
