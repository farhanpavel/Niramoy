"use client";
import ChipSection from "@/components/ai/page";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const AIPromptPage: React.FC = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (userInput.trim() === "") {
      alert("Please enter your problem!");
      return;
    }

    setLoading(true);

    try {
      // First, make the request to the /ai/niramoy endpoint
      const response = await axios.post("http://localhost:4000/ai/niramoy", {
        prompt: userInput,
        id: Cookies.get("id"),
      });

      console.log("Response from /ai/niramoy:", response.data);

      // Now, make the request to the /api/date endpoint to save the user_id and current date
      const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format
      await axios.post("http://localhost:4000/api/date", {
        user_id: Cookies.get("id"),
        date: currentDate,
      });

      console.log("Date and user ID saved:", {
        user_id: Cookies.get("id"),
        date: currentDate,
      });

      // After both requests are successful, navigate to the next page
      router.push("/patientdashboard/nutrion");
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error processing your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Image
        src="/images/logo.png"
        height={200}
        width={200}
        alt="AI Logo"
        className="w-36 h-36"
      />
      <p className="mt-5 text-lg text-center">
        আপনার সমস্যাগুলো বলুন, নীরাময় আপনাদের সহায়তায় আছ।
      </p>
      <div className="mt-5" />
      <input
        type="text"
        placeholder="আপনার সমস্যাগুলো লিখুন..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="w-[70vw] mx-28 mt-5 p-5 rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E81046]"
      />
      <button
        onClick={handleSubmit}
        className="mt-5 px-10 py-3 rounded-full bg-[#E81046] text-white cursor-pointer flex items-center justify-center"
        disabled={loading}
      >
        {loading ? "জমা দেওয়া হচ্ছে..." : "জমা দিন"}
      </button>
      <div className="mt-6" />
      <ChipSection />
    </div>
  );
};

export default AIPromptPage;
