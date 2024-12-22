"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "আমি রাজু, আমি কীভাবে আপনাকে সাহায্য করতে পারি?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize the GoogleGenerativeAI instance
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDX4V5zqXBXuevk_-lL_gsQXd9asadr-NI"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input field

    try {
      setLoading(true);

      // Generate bot response using Gemini
      const result = await model.generateContent(input);
      const botMessage = {
        sender: "bot",
        text: result.response.text(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      const botMessage = {
        sender: "bot",
        text: "দুঃখিত, আমি একটি ত্রুটির সম্মুখীন হয়েছি। আবার চেষ্টা করুন।",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-[#E81046] mb-4">
          তোমার বন্ধু
        </h1>

        <div
          className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] p-4 border rounded-md"
          style={{ height: "60vh" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === "user"
                    ? "bg-[#E81046] text-white"
                    : "bg-gray-200 text-black"
                } p-3 rounded-lg max-w-[70%]`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#E81046]"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className="bg-[#E81046] text-white px-4 py-3 rounded-r-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
