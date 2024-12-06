"use client"
import React from "react";
import Image from 'next/image';

export default function Page() {
  return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-[80%] sm:w-3/4 m-auto  flex flex-wrap sm:flex-nowrap  shadow-lg shadow-[#E81046] justify-around text-center p-16 ">
    <div className='w-full m-12 grid grid-cols-2 gap-8'>
       <Image src={"/images/signin.png"} height={800} width={800} className='w-full object-cover' alt='Authentication'/>
       <div className="ml-12 flex items-center justify-center">
            <form className="w-full max-w-sm">
              <div className="flex items-center justify-center mb-4">
                <Image src="/images/logo.png" height={200} width={200} alt="Icon" />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[#E81046]"
                  id="email"
                  type="email"
                  placeholder="ইমেইল"
                />
              </div>
                <div className="mb-6">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[#E81046]"
                  id="password"
                  type="password"
                  placeholder="পাসওয়ার্ড"
                />
                </div>
              <div className="flex items-center gap-4 w-full">
                <button
                  className="bg-[#E81046] w-full hover:bg-[#C70E3A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  সাইন ইন
                </button>
                <button
                  className="bg-white w-full hover:bg-gray-100 text-[#E81046] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-[#E81046]"
                  type="button"
                >
                  সাইন আপ
                </button>
              </div>
            </form>
        </div>
        </div>
        </div>
    </div>
  );
}
