"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: name, text: input },
      ]);
      setInput("");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (messages.length < 10) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "User " + (Math.floor(Math.random() * 100) + 1),
            text: "Hello from another user!",
          },
        ]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="font-tiro bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center py-5 px-4 bg-gray-200">
        <div></div>

        <div className="text-4xl text-center text-[#4a4a4a] border-b-2 border-[#E81046]">
          <h1>চ্যাট রুম</h1>
        </div>

        <div></div>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto max-h-[60vh] p-4 border rounded-md m-4 bg-white shadow-lg">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === name ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === name
                    ? "bg-[#E81046] text-white"
                    : "bg-gray-200 text-black"
                } p-3 rounded-lg max-w-[70%]`}
              >
                <strong>{msg.sender}</strong>: {msg.text}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No messages yet. Be the first to start the conversation!
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-3 p-4 bg-gray-200">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="আপনার বার্তা টাইপ করুন..."
          className="flex-1 border p-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#E81046]"
        />
        <button
          onClick={handleSendMessage}
          className="bg-[#E81046] text-white px-4 py-3 rounded-r-lg"
        >
          পাঠান
        </button>
      </div>
    </div>
  );
}
