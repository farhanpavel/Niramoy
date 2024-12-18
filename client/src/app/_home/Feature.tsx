import React from "react";
import Image from "next/image";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { BiSolidInjection } from "react-icons/bi";
import { FaHeartbeat } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa6";

export default function Feature() {
  return (
    <div className="font-tiro">
      <div className="text-center">
        <h1 className="text-[#4a4a4a] text-xl border-b-2 inline-block border-[#E81046]">
          সেবাসমূহ
        </h1>
        <div className="mt-2 text-2xl">
          <p>
            উন্মোচন করুন আপনার সুস্বাস্থ্যের নতুন দিগন্ত
            <br />
            নিরাময় এর মাধ্যমে
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4">
          <Image
            src={"/images/Feature.png"}
            width={500}
            height={500}
            alt="feature"
            className="mx-auto"
          />
        </div>

        {/* Sidebar Section */}
        <div className="w-full md:w-1/2 p-4">
          <div className="space-y-8">
            <div className="flex items-start space-x-4 w-3/4">
              <div className="text-5xl text-[#E81046]">
                <AiOutlineMedicineBox className="border-2 rounded-full p-2 border-[#E81046] border-dotted" />
              </div>
              <p>
                নিরাময় একটি ডিজিটাল প্ল্যাটফর্ম যা মানসিক স্বাস্থ্য সচেতনতা ও
                সেবার জন্য ব্যবহারকারী এবং সেবাদাতাদের মধ্যে সেতুবন্ধন তৈরি করে।
              </p>
            </div>
            <div className="flex items-start space-x-4 w-3/4">
              <div className="text-5xl text-[#E81046]">
                <BiSolidInjection className="border-2 rounded-full p-2 border-[#E81046] border-dotted" />
              </div>
              <p>
                নিরাময় আপনাকে উন্নত প্রযুক্তি এবং এআই-এর মাধ্যমে মানসিক
                স্বাস্থ্যসেবার সঠিক তথ্য ও ব্যক্তিগত পরামর্শ প্রদান করে, যা
                আপনার মানসিক শান্তি ও সুস্থতার যত্নে সহায়ক।
              </p>
            </div>
            <div className="flex items-start space-x-4 w-3/4">
              <div className="text-5xl text-[#E81046]">
                <FaHeartbeat className="border-2 rounded-full p-2 border-[#E81046] border-dotted" />
              </div>
              <p>
                নিরাময় একটি উদ্ভাবনী প্ল্যাটফর্ম যা মানসিক স্বাস্থ্যসেবা এবং
                ব্যক্তিগত সহায়তা সহজলভ্য করে, দৈনন্দিন জীবনে মানসিক শক্তি ধরে
                রাখার প্রতিটি পদক্ষেপে আপনার পাশে থাকে।
              </p>
            </div>
            <div className="flex items-start space-x-4 w-3/4">
              <div className="text-5xl text-[#E81046]">
                <FaHandHoldingMedical className="border-2 rounded-full p-2 border-[#E81046] border-dotted" />
              </div>
              <p>
                নিরাময় প্রযুক্তি ও এআই-এর মাধ্যমে মানসিক স্বাস্থ্যসেবা প্রদান
                করে, যা রোগীদের জন্য সঠিক, দ্রুত এবং কার্যকরী মানসিক সাপোর্ট
                নিশ্চিত করে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
