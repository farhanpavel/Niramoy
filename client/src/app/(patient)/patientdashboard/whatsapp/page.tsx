"use client";
import React, { useState } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";

export default function Page() {
  const [whatsNumber, setWhatsNumber] = useState(""); // State for WhatsApp number
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  const data = {
    ai_response: {
      content:
        "আপনার পেট ব্যাথায় আমি দুঃখিত।  এই সমস্যার কারণ অনেক কিছু হতে পারে, তাই সঠিক চিকিৎসার জন্য একজন ডাক্তারের সাথে পরামর্শ করা অত্যন্ত গুরুত্বপূর্ণ।  ঘরোয়া প্রতিকার হিসেবে আপনি হালকা গরম পানি পান করতে পারেন,  আরামে শুয়ে থাকতে পারেন এবং পেটে হালকা ম্যাসাজ করতে পারেন।  তবে যদি ব্যথা তীব্র হয় বা অন্যান্য লক্ষণ দেখা দেয়, তাহলে দ্রুত ডাক্তারের সাথে যোগাযোগ করুন।",
    },
    diet_plan: {
      name: "পেটের ব্যথা নিরাময়ের জন্য ডায়েট প্ল্যান",
      description:
        "এই ডায়েট প্ল্যানটি পেটের ব্যথা কমাতে এবং শরীরকে পুষ্টিতে সমৃদ্ধ করতে সাহায্য করবে।  এতে হালকা, সহজে হজম হওয়ার খাবার রাখা হয়েছে।  তবে কোন খাবার আপনার পেটে অস্বস্তি বাড়ায়, সেগুলো এড়িয়ে চলুন।  ডাক্তারের পরামর্শ ছাড়া কোন ওষুধ নয়।",
      meals: [
        {
          type: "breakfast",
          items:
            "ওটমিল, কলা,  দুধ (ডেইরি অ্যালার্জি থাকলে বাদামের দুধ ব্যবহার করুন)",
        },
        {
          type: "lunch",
          items: "ভাত,  ছোট টুকরো করে কাটা মুরগী,  সবজি (শাক,  ফুলকপি,  গাজর)",
        },
        { type: "dinner", items: "তুষারকুমড়ো স্যুপ, টোস্ট" },
      ],
    },
    exercises: [
      { name: "হালকা হাঁটা", category: "কার্ডিও", duration_minutes: 30 },
      {
        name: "উপরের শরীরের স্ট্রেচিং",
        category: "স্ট্রেচিং",
        duration_minutes: 15,
      },
    ],
  };

  // Generate the PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);

    // Title
    doc.text("Diet Plan and Exercises", 20, 20);

    // AI Response
    doc.setFontSize(12);
    doc.text("AI Response:", 20, 30);
    doc.text(data.ai_response.content, 20, 40, { maxWidth: 170 });

    // Diet Plan
    doc.addPage();
    doc.text("Diet Plan: " + data.diet_plan.name, 20, 20);
    doc.text(data.diet_plan.description, 20, 30, { maxWidth: 170 });

    doc.text("Meals:", 20, 50);
    let yOffset = 60;
    data.diet_plan.meals.forEach((meal, index) => {
      doc.text(`${meal.type}: ${meal.items}`, 20, yOffset);
      yOffset += 10;
    });

    // Exercises
    doc.addPage();
    doc.text("Exercises:", 20, 20);
    data.exercises.forEach((exercise, index) => {
      doc.text(
        `${exercise.name} (${exercise.category}): ${exercise.duration_minutes} minutes`,
        20,
        30 + index * 10
      );
    });

    // Save PDF (get Blob)
    const pdfBlob = doc.output("blob");
    return pdfBlob;
  };

  // Handle WhatsApp number change
  const handleWhatsNumberChange = (e) => {
    setWhatsNumber(e.target.value);
  };

  // Handle sending the PDF URL to WhatsApp
  const handleSendToWhatsApp = async () => {
    if (!whatsNumber.trim()) {
      setError("Please enter a valid WhatsApp number.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error

    try {
      // Generate PDF (optional)
      const pdfBlob = generatePDF();

      // Manually upload PDF somewhere and get the public URL
      const pdfURL =
        "https://your-storage-link.com/path-to-your-uploaded-pdf.pdf"; // Replace this with your actual public URL

      // Encode URL for WhatsApp message
      const message = `Here is your Gym and Nutrition Plan.\nYou can download it from the following link: ${pdfURL}`;
      const encodedMessage = encodeURIComponent(message);

      // Construct WhatsApp link with the encoded message
      const whatsAppLink = `https://wa.me/${whatsNumber}?text=${encodedMessage}`;

      // Open WhatsApp with the link
      window.open(whatsAppLink, "_blank");
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    const url = "https://graph.facebook.com/v21.0/492083883992907/messages";
    const token =
      "EAAIF0JoKuLIBO4fIq1fPLZA8COooqc4966DRp2jBZCGdhwzNY58sN3PQgttAmH04ZBrL0aNGDBqIDHPAuHds5SmEEKazUgMjQUUNbZCKYoHkvTu24WC8jw7Nq6iVSSKOHQZCdiFTRFzJg4FyvBeJpdybBtRfsjt2arNVuqVGBoZAzQdFal9MHgAZA9WYvPlwQ5GP8j0qXchsILBIaLb5t9FrqMXlGIZD";
    const data = {
      messaging_product: "whatsapp",
      to: "8801618070200",
      type: "template",
      template: {
        name: "hello_world",
        language: {
          code: "en_US",
        },
      },
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Message sent:", response.data);
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response ? error.response.data : error.message
      );
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
        <input
          type="text"
          value={whatsNumber}
          onChange={handleWhatsNumberChange}
          placeholder="Enter WhatsApp Number"
          className="border p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#E81046]"
        />

        <button
          onClick={handleSendToWhatsApp}
          className="bg-[#E81046] text-white px-6 py-3 rounded-lg hover:bg-[#c70e3b]"
        >
          Generate & Send to WhatsApp
        </button>

        {loading && <p className="mt-4 text-blue-500">Loading...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
