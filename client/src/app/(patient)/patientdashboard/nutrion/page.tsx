"use client";
import Image from "next/image";
import React from "react";
import { Sun, Moon, Cloud } from "lucide-react"; // Importing icons from lucide-react

const AIPromptPage: React.FC = () => {
  const dietPlan = {
    name: "পিঠের ব্যথায় উপকারী খাবার",
    description:
      "পিঠের ব্যথার সময় পুষ্টিকর খাবার খাওয়া খুবই জরুরী।  ক্যালসিয়াম,  ম্যাগনেসিয়াম, এবং ভিটামিন D সমৃদ্ধ খাবার খাওয়ার  চেষ্টা করুন।  এইগুলো  হাড়ের স্বাস্থ্যের জন্য  অনেক গুরুত্বপূর্ণ।  প্রচুর পরিমাণে পানি পান করুন।  শাকসবজি, ফল,  মাছ, এবং  দুধ  খাওয়া উচিত।  জাঙ্ক ফুড,  মিষ্টি  খাবার, এবং  চিনি  যুক্ত  পানীয়  সীমিত  করুন।",
    calorie_target: 1800,
    meals: [
      {
        id: 1,
        dietPlanId: 1,
        type: "breakfast",
        items: "ওটমিল,  ফল (আপেল,  কেলা),  দুধ",
        recipe_description:
          "ওটমিলের সাথে  কিছু  ফল কেটে মিশিয়ে  দুধ  মিশিয়ে  খেতে পারেন।  এটি  শক্তিশালী  এবং  পুষ্টিকর একটি  নাশতা।",
      },
      {
        id: 2,
        dietPlanId: 1,
        type: "lunch",
        items: "সবুজ শাক,  ভাত,  মুরগির  ছোট  টুকরো,  সালাদ",
        recipe_description:
          "ভাতের সাথে  শাক  ভাজা  এবং  মুরগির  ছোট  টুকরো  মেশিয়ে  খেতে  পারেন।  সালাদ  সাথে  খাওয়া  খুবই  উপকারী।",
      },
      {
        id: 3,
        dietPlanId: 1,
        type: "dinner",
        items: "মাছ,  ভাত,  সবজি",
        recipe_description:
          "ভাতের সাথে  মাছ  ভাপে  পাকিয়ে  এবং  বিভিন্ন  সবজি  মিশিয়ে  খেতে পারেন।  এতে  প্রচুর  প্রোটিন  এবং  পুষ্টি  থাকে।",
      },
    ],
  };

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
      <div className="bg-white p-16 rounded-lg shadow-md w-full max-w-4xl">
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
              className="bg-gray-50 p-4 rounded-2xl shadow border-2 border-[#E81046] text-black hover:bg-[#E81046] hover:text-white hover:border-0 transition duration-300"
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
