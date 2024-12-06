import React from "react";
import { FaBrain } from "react-icons/fa";
import { GiLiver } from "react-icons/gi";
import { FaSyringe } from "react-icons/fa";
import { FaUserNurse } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { FaAmbulance } from "react-icons/fa";
export default function Benefits() {
  return (
    <div className="font-tiro">
      <div className="text-center">
        <h1 className="text-[#4a4a4a] text-xl">বৈশিষ্ট্য</h1>
        <div className="mt-2 text-2xl">
          <p>
            স্বাস্থ্যসেবার নতুন যুগে প্রবেশ করুন নিরাময়
            <br />
            এর মাধ্যমে
          </p>
        </div>
        <div className="mt-10">
          <div className="flex flex-wrap justify-around w-full">
            <div className="w-full sm:w-[28%] p-4 space-y-5 ">
              <div className="flex justify-center">
                <FaBrain className="text-4xl text-blue-500" />
              </div>
              <h1 className="text-xl font-semibold">
                ব্যক্তিগত মানসিক স্বাস্থ্য সহায়ক
              </h1>
              <p className="mt-2 text-lg text-left">
                নিরাময় একটি এআই-চালিত মানসিক স্বাস্থ্যসেবা প্ল্যাটফর্ম, যা
                ব্যবহারকারীদের দৈনন্দিন মুড ট্র্যাকিং, ব্যায়াম ও পুষ্টি পরামর্শ
                এবং মানসিক সহায়তা প্রদান করে। ব্যবহারকারীর প্রতিক্রিয়ার উপর
                ভিত্তি করে ড্যাশবোর্ডের প্রতিটি বিভাগ, যেমন মুড ট্র্যাকার, ব্লগ,
                পুষ্টি ও ব্যায়াম সেকশন স্বয়ংক্রিয়ভাবে আপডেট হয়।
              </p>
            </div>

            <div className="w-full sm:w-[28%] p-4  space-y-5 text-left">
              <div className="flex justify-center">
                <GiLiver className="text-4xl text-red-950" />
              </div>

              <h1 className="text-xl font-semibold">
                আপনার মানসিক স্বাস্থ্য ঠিক রাখতে একটি উদ্ভাবনী সমাধান
              </h1>
              <p className="mt-2 text-lg">
                নিরাময় ব্যবহারকারীদের জন্য ব্যায়াম ও পুষ্টি পরামর্শ প্রদান করে
                যা এআই-বটের মাধ্যমে ব্যক্তিগতকৃত হয়। এটি ব্লগ এবং ফোরামের
                মাধ্যমে অভিজ্ঞতা শেয়ারের সুযোগ দেয়, যা ব্যবহারকারীদের মানসিক
                সমর্থন ও সচেতনতা বাড়াতে সাহায্য করে।
              </p>
            </div>

            <div className="w-full sm:w-[28%] p-4 space-y-5 text-left">
              <div className="flex justify-center">
                <FaSyringe className="text-4xl text-yellow-400" />
              </div>
              <h1 className="text-xl font-semibold">
                সবার জন্য একটি ব্যক্তিগত মানসিক সঙ্গী
              </h1>
              <p className="mt-2 text-lg">
                নিরাময় এমন একটি প্ল্যাটফর্ম যা মানসিক স্বাস্থ্যসেবাকে সহজলভ্য
                করে। এটি ব্যবহারকারীদের অনুভূতি বোঝে, তাদের জন্য মুড ট্র্যাকিং
                এবং সহায়ক টিপস প্রদান করে। মানসিক শক্তি বাড়াতে এটি প্রতিদিনের
                সঙ্গী হয়ে কাজ করে।
              </p>
            </div>

            <div className="w-full sm:w-[28%] p-4 space-y-5 text-left">
              <div className="flex justify-center">
                <FaUserNurse className="text-4xl text-red-500" />
              </div>
              <h1 className="text-xl font-semibold">
                এআই-চালিত মানসিক স্বাস্থ্যসেবা, আপনার জন্য
              </h1>
              <p className="mt-2 text-lg">
                নিরাময় এমন একটি উদ্ভাবনী প্ল্যাটফর্ম যা মানসিক স্বাস্থ্যের
                প্রতিটি বিভাগে সঠিক সহায়তা প্রদান করে। মুড ট্র্যাকিং, ব্লগ,
                পুষ্টি এবং ব্যায়ামের জন্য স্বয়ংক্রিয় আপডেটের মাধ্যমে এটি
                ব্যবহারকারীদের দৈনন্দিন অভ্যাস উন্নত করে এবং মানসিক শান্তি
                নিশ্চিত করে।
              </p>
            </div>

            <div className="w-full sm:w-[28%] p-4 space-y-5 text-left">
              <div className="flex justify-center">
                <FaAmbulance className="text-4xl text-green-500" />
              </div>
              <h1 className="text-xl font-semibold">
                মানসিক স্বাস্থ্য সুরক্ষার জন্য একটি সমন্বিত প্ল্যাটফর্ম
              </h1>
              <p className="mt-2 text-lg">
                নিরাময় মানসিক স্বাস্থ্য উন্নয়নের জন্য একটি এআই-চালিত
                প্ল্যাটফর্ম, যা মুড ট্র্যাকিং, পুষ্টি ও ব্যায়ামের পরামর্শ এবং
                একটি অন্তর্মুখী-বন্ধু এআই সহায়তা প্রদান করে। এটি ব্যবহারকারীদের
                অভিজ্ঞতা শেয়ার করার জন্য ব্লগ এবং ফোরামের সুবিধা দেয়।
              </p>
            </div>

            <div className="w-full sm:w-[28%] p-4 space-y-5 text-left">
              <div className="flex justify-center">
                <GiMedicines className="text-4xl text-orange-500" />
              </div>
              <h1 className="text-xl font-semibold">
                আপনার মানসিক শান্তি নিশ্চিত করার ডিজিটাল সমাধান
              </h1>
              <p className="mt-2 text-lg">
                নিরাময় একটি উদ্ভাবনী প্ল্যাটফর্ম যা মুড ট্র্যাকিং এবং
                স্ব-সহায়ক সম্পদের মাধ্যমে ব্যবহারকারীদের মানসিক স্বাস্থ্যের
                যত্ন নেয়। প্রতিদিনের ড্যাশবোর্ড আপডেট এবং এআই-বটের পরামর্শের
                মাধ্যমে এটি ব্যক্তিগতকৃত সমর্থন প্রদান করে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
