"use client";
import Image from "next/image";
import React from "react";
import { Activity, Dumbbell } from "lucide-react"; // Importing icons from lucide-react

const ExercisePage: React.FC = () => {
  const exercises = [
    {
      id: 5,
      name: "পিঠের জন্য স্ট্রেচিং",
      description:
        "পিঠের ব্যথা কমাতে নিয়মিত স্ট্রেচিং করা খুবই গুরুত্বপূর্ণ।  এই ব্যায়ামগুলি পেশী শিথিল করতে এবং পিঠের নমনীয়তা বৃদ্ধি করতে সাহায্য করে।  কিছু সহজ স্ট্রেচ যেমন,  ক্যাট-কাউ স্ট্রেচ,  স্পাইনাল টুইস্ট, এবং হ্যামস্ট্রিং স্ট্রেচ করতে পারেন।  প্রতিটি স্ট্রেচ 30 সেকেন্ড ধরে ধরে রাখুন এবং দিনে দুইবার করুন।  ব্যায়াম শুরু করার আগে হালকা ওয়ার্ম-আপ করুন এবং শেষে কুল ডাউন করুন।  যদি ব্যথা বেড়ে যায়, তাহলে ব্যায়াম বন্ধ করুন এবং ডাক্তারের সাথে পরামর্শ করুন।",
      category: "পিঠের ব্যথা",
      duration_minutes: 15,
      created_at: "2024-12-06T10:34:08.336Z",
      response_id: 3,
    },
    {
      id: 6,
      name: "প্ল্যাঙ্ক",
      description:
        "প্ল্যাঙ্ক একটি দারুণ ব্যায়াম যা পিঠের পেশীকে শক্তিশালী করে।  এটি করার সময় আপনার শরীর একটি সোজা লাইনে থাকতে হবে,  কোমর নিচে নামানো যাবে না।  প্রথমে 15-30 সেকেন্ড ধরে রাখার চেষ্টা করুন এবং ধীরে ধীরে সময় বাড়ান।  দিনে দুইবার করুন।  যদি ব্যথা বেড়ে যায়, তাহলে ব্যায়াম বন্ধ করুন এবং ডাক্তারের সাথে পরামর্শ করুন।",
      category: "পিঠের ব্যথা",
      duration_minutes: 5,
      created_at: "2024-12-06T10:34:08.345Z",
      response_id: 3,
    },
  ];

  const icons = [
    <Activity key="activity" className="w-6 h-6" />,
    <Dumbbell key="dumbbell" className="w-6 h-6" />
  ];

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
        সুস্থ দেহ, সুস্থ মন: ব্যায়ামের মাধ্যমে সঠিক পথ অনুসরণ করুন
      </h1>
      <div className="bg-white p-16 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-xl text-center  font-bold mb-8">সম্ভাব্য সহায়ক ব্যায়াম</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="bg-gray-50 p-4 rounded-2xl shadow border-2 border-[#E81046] text-black hover:bg-[#E81046] hover:text-white hover:border-0 transition duration-300"
            >
              <div className="flex items-center mb-2">
                {icons[index % icons.length]}
                <h3 className="text-lg font-bold capitalize ml-2">{exercise.name}</h3>
              </div>
              <p className="mb-2"><strong>সমস্যা:</strong> {exercise.category}</p>
              <p className="mb-2"><strong>সময়কাল:</strong> {exercise.duration_minutes} minutes</p>
              <p><strong>বর্ণনা :</strong> {exercise.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;