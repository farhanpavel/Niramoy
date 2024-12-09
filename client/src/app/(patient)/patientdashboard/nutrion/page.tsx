"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sun, Moon, Cloud } from "lucide-react"; // Importing icons from lucide-react

const AIPromptPage: React.FC = () => {
  const [dietPlan, setDietPlan] = useState(null);

  useEffect(() => {
    const fetchDietPlan = async () => {
      try {
        const response = await axios.get("http://localhost:4000/latest");
        setDietPlan(response.data.diet_plan);
      } catch (error) {
        console.error("Error fetching diet plan:", error);
      }
    };

    fetchDietPlan();
  }, []);

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
    return <div>Loading...</div>;
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
          {dietPlan.meals.map((meal) => (
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
              <p className="mb-2">
                <strong>Items:</strong> {meal.items}
              </p>
              <p>
                <strong>Recipe:</strong> {meal.recipe_description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIPromptPage;
