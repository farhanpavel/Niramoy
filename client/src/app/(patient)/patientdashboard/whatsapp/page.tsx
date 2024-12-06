"use client";
import React, { useState } from "react";

export default function Page() {
  const [whatsNumber, setWhatsNumber] = useState(""); // State for WhatsApp number
  const [gymAndNutrition, setGymAndNutrition] = useState(null); // State for the fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Handle WhatsApp number change
  const handleWhatsNumberChange = (e) => {
    setWhatsNumber(e.target.value);
  };

  // Handle API request when button is pressed
  const handleGetGymAndNutritionList = async () => {
    if (!whatsNumber.trim()) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error

    try {
      // Make the API request
      const response = await fetch("http://localhost:4000/latest");
      if (!response.ok) {
        throw new Error("Failed to fetch gym and nutrition list.");
      }
      const data = await response.json();
      setGymAndNutrition(data); // Store the data in state
    } catch (err) {
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-tiro">
      <div className="flex justify-between items-center py-5 px-4 bg-gray-100">
        <div></div>

        <div className="text-4xl text-center text-[#4a4a4a] border-b-2 border-[#E81046]">
          <h1>WhatsApp Number Input</h1>
        </div>

        <div></div>
      </div>

      <div className="flex flex-col items-center mt-10">
        {/* WhatsApp Number Input */}
        <input
          type="text"
          value={whatsNumber}
          onChange={handleWhatsNumberChange}
          placeholder="Enter WhatsApp Number"
          className="border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#E81046]"
        />

        <button
          onClick={handleGetGymAndNutritionList}
          className="bg-[#E81046] text-white px-6 py-3 rounded-lg hover:bg-[#c70e3b]"
        >
          Get Gym & Nutrition List
        </button>

        {loading && <p className="mt-4 text-blue-500">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        {/* Display Gym and Nutrition List */}
        {gymAndNutrition && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">
              Gym & Nutrition List
            </h2>
            <ul>
              {gymAndNutrition.map((item, index) => (
                <li key={index} className="mb-3">
                  <strong>{item.gymName}</strong>: {item.nutritionInfo}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
