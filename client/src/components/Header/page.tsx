"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-center font-tiro">
      <div className="fixed w-[90%] mt-2 lg:w-[70%] z-50 flex items-center justify-between p-2 bg-[#FAFAFA] shadow-xl rounded-lg">
        <div className="flex items-center">
          <Image src={"/images/logo.png"} width={70} height={20} alt="logo" />
        </div>

        <button
          className="block md:hidden text-red-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center gap-10 lg:gap-20 absolute md:static top-full left-0 w-full md:w-auto bg-[#FAFAFA] md:bg-transparent shadow-lg md:shadow-none rounded-lg md:rounded-none`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-20 p-4 md:p-0">
            <li>
              <a
                className="group inline-flex items-center justify-center 
                px-4 py-2 min-h-[2.25rem] w-max text-md font-semibold 
                text-red-600 transition-all duration-300 
                hover:shadow-[0_4px_2px_-2px_rgba(255,50,80,0.6)]"
                href=""
              >
                সেবাসমূহ
              </a>
            </li>
            <li>
              <a
                className="group inline-flex items-center justify-center 
                px-4 py-2 min-h-[2.25rem] w-max text-md font-semibold 
                text-red-600 transition-all duration-300 
                hover:shadow-[0_4px_2px_-2px_rgba(255,50,80,0.6)]"
                href=""
              >
                বৈশিষ্ট্য
              </a>
            </li>
            <li>
              <a
                className="group inline-flex items-center justify-center 
                px-4 py-2 min-h-[2.25rem] w-max text-md font-semibold 
                text-red-600 transition-all duration-300 
                hover:shadow-[0_4px_2px_-2px_rgba(255,50,80,0.6)]"
                href=""
              >
                কিভাবে কাজ করে?
              </a>
            </li>
          </ul>
        </div>

        <div className="hidden md:block">
          <Link
            href="/signin"
            className="bg-red-600 px-6 py-3 text-white rounded-full text-xs font-semibold 2xl:px-8 2xl:py-4"
          >
            লগইন
          </Link>
        </div>
      </div>
    </div>
  );
}
