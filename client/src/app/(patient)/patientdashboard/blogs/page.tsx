import React from "react";
import Link from "next/link";
export default function page() {
  return (
    <div className="font-tiro">
      <div className="flex justify-between items-center py-5 px-4 bg-gray-100">
        {/* Empty div for spacing or potential content */}
        <div></div>

        {/* Title Section */}
        <div className="text-4xl text-center text-[#4a4a4a] border-b-2 border-[#E81046]">
          <h1>ব্লগ সমূহ</h1>
        </div>

        {/* Button Section */}
        <div>
          <button className="bg-[#E81046] text-white px-4 py-2 rounded hover:bg-[#c70e3b]">
            <Link href="/patientdashboard/blogs/new"> ব্লগ তৈরি করুন</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
