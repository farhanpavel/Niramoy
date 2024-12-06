import Link from "next/link";
import React from "react";

export default function Bottom() {
  return (
    <div className="font-tiro">
      <div className="mt-20 bg-[#E81046] rounded-xl p-14 w-[90%] mx-auto">
        <div className="text-center text-white space-y-6">
          <div>
            <h1 className="text-3xl   font-semibold  font-sansSerif leading-[3rem]">
              উন্মোচন করুন আপনার সুস্বাস্থ্য সম্ভাবনা
              <br />
              নিরাময় এর মাধ্যমে আজই।
            </h1>
          </div>

          <div>
            <button className="px-8 py-4  bg-white text-[#E81046] font-semibold rounded-full ">
              <Link href={"/signup"} className="font-tiro text-[#E81046]">
                সাইন আপ
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
