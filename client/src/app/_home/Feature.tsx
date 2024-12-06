import React from "react";
import Image from "next/image";
import { FaSyringe } from "react-icons/fa6";
export default function Feature() {
  return (
    <div className="font-tiro">
      <div className="text-center">
        <h1 className="text-[#4a4a4a] text-xl">সেবাসমূহ</h1>
        <div className="mt-2 text-2xl">
          <p>
            উন্মোচন করুন আপনার সুস্বাস্থ্যের নতুন দিগন্ত
            <br />
            নিরাময় এর মাধ্যমে
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-around">
        <div>
          <Image
            src={"/images/Feature.png"}
            width={500}
            height={500}
            alt="feature"
          />
        </div>
        <div className="w-1/3 grid grid-cols-2   items-center">
          <div>
            <div>
              <FaSyringe />

              <p>
                নিরাময় একটি ডিজিটাল প্ল্যাটফর্ম যা মানসিক স্বাস্থ্য সচেতনতা ও
                সেবার জন্য ব্যবহারকারী এবং সেবাদাতাদের মধ্যে সেতুবন্ধন তৈরি করে,
                সহজে মুড ট্র্যাকিং, পুষ্টি ও ব্যায়াম পরামর্শ এবং সঠিক মানসিক
                সহায়তা নিশ্চিত করে।
              </p>
            </div>
            <div>
              <FaSyringe />
              <p>
                নিরাময় আপনাকে উন্নত প্রযুক্তি এবং এআই-এর মাধ্যমে মানসিক
                স্বাস্থ্যসেবার সঠিক তথ্য ও ব্যক্তিগত পরামর্শ প্রদান করে, যা
                আপনার মানসিক শান্তি ও সুস্থতার যত্নে সহায়ক।
              </p>
            </div>
          </div>
          <div>
            <div>
              <FaSyringe />
              <p>
                নিরাময় একটি উদ্ভাবনী প্ল্যাটফর্ম যা মানসিক স্বাস্থ্যসেবা এবং
                ব্যক্তিগত সহায়তা সহজলভ্য করে, দৈনন্দিন জীবনে মানসিক শক্তি ধরে
                রাখার প্রতিটি পদক্ষেপে আপনার পাশে থাকে।
              </p>
            </div>
            <div>
              <FaSyringe />
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
