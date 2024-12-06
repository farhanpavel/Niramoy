"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importing useRouter for navigation

export default function Page() {
  const [name, setName] = useState(""); // State to store the unique name
  const router = useRouter(); // Initialize useRouter

  // Handle input change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the name is unique (you could add a check here if needed)
    if (name.trim()) {
      // Redirect to the new chat page with the unique name
      router.push(`/patientdashboard/forums/new?name=${name}`);
    }
  };

  return (
    <div className="font-tiro">
      <div className="flex justify-between items-center py-5 px-4 bg-gray-100">
        <div></div>

        <div className="text-4xl text-center text-[#4a4a4a] border-b-2 border-[#E81046]">
          <h1>আমার ফোরাম</h1>
        </div>

        <div></div>
      </div>

      <div className="flex justify-center mt-10">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="text-xl font-semibold mb-2" htmlFor="name">
            অনুগ্রহ করে একটি ইউনিক নাম লিখুন:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="আপনার নাম দিন"
            className="border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#E81046]"
          />
          <button
            type="submit"
            className="bg-[#E81046] text-white px-6 py-3 rounded-lg hover:bg-[#c70e3b]"
          >
            চ্যাট শুরু করুন
          </button>
        </form>
      </div>
    </div>
  );
}
