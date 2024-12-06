import React from "react";
import Image from "next/image";
export default function Hero() {
  return (
    <div>
      <div className="lg:flex  justify-around items-center min-h-screen container ">
        <div className="w-1/2 space-y-6">
          <div className="text-[2.7rem] font-tiro  font-extrabold leading-[3rem] text-[#4a4a4a]">
            <h1>
              আপনার জরুরি প্রয়োজনে <br />
              কে পাশে থাকবে?
            </h1>
          </div>
          <div className="w-[70%] font-tiro">
            <p className="text-lg font-medium leading-[1.7rem] text-[#4a4a4a]">
              আপনার মানসিক স্বাস্থ্য ও সার্বিক সুস্থতার জন্য আমরা নিয়ে এসেছি
              একটি সহজ ও সমন্বিত প্ল্যাটফর্ম। এখানে আপনি পাবেন দৈনিক মুড
              ট্র্যাকিং, এআই-চালিত ব্যায়াম ও পুষ্টি পরামর্শ, রোগী এবং ডাক্তারের
              জন্য পৃথক ড্যাশবোর্ড, এবং মানসিক স্বাস্থ্য সচেতনতার জন্য ব্লগ ও
              ফোরামের সুবিধা। এছাড়া রয়েছে একটি এআই বন্ধু, যে আপনার অনুভূতির
              সঙ্গী হবে এবং আপনাকে প্রয়োজনীয় সহায়তা দেবে। আমরা প্রতিশ্রুতিবদ্ধ
              আপনার মানসিক শান্তি এবং সুস্থতার পথ সহজতর করতে।
            </p>
          </div>
        </div>
        <div>
          <Image src={"/images/hero.png"} width={500} height={450} alt="hero" />
        </div>
        <div></div>
      </div>
    </div>
  );
}
