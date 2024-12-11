"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Activity, Dumbbell } from "lucide-react"; // Importing icons from lucide-react
import Cookies from "js-cookie";
const ExercisePage: React.FC = () => {
  const [exercises, setExercises] = useState([]);
  const id = Cookies.get("id");
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/latest/${id}`);
        setExercises(response.data.exercises);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  const icons = [
    <Activity key="activity" className="w-6 h-6" />,
    <Dumbbell key="dumbbell" className="w-6 h-6" />,
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
        <h2 className="text-xl text-center font-bold mb-8">
          সম্ভাব্য সহায়ক ব্যায়াম
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.id}
              className="bg-gray-50 p-4 rounded-2xl shadow border-2 border-[#E81046] text-black hover:bg-[#E81046] hover:text-white hover:border-0 transition duration-300"
            >
              <div className="flex items-center mb-2">
                {icons[index % icons.length]}
                <h3 className="text-lg font-bold capitalize ml-2">
                  {exercise.name}
                </h3>
              </div>
              {exercise.youtube_link && (
                <div className="mt-2 rounded-lg overflow-hidden shadow-md">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${new URL(
                      exercise.youtube_link
                    ).searchParams.get("v")}`}
                    title={exercise.name}
                    frameBorder="0"
                    allowFullScreen
                    className="transition duration-300 hover:scale-105"
                  ></iframe>
                </div>
              )}
              <p className="mb-2 mt-4">
                <strong>সমস্যা:</strong> {exercise.category}
              </p>
              <p className="mb-2">
                <strong>সময়কাল:</strong> {exercise.duration_minutes} minutes
              </p>
              <p>
                <strong>বর্ণনা :</strong> {exercise.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
