"use client";
import React, { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isvalid, setvalid] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "patient",
  });
  const { name, email, password, confirmpassword } = user;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    if (!email || !password || !name || !confirmpassword) {
      alert("Please fill everything.");
      return;
    }
    if (password == confirmpassword) {
      try {
        const response = await fetch(`http://localhost:4000/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) {
          alert("Server Error");
          throw new Error("Failed to submit data");
        } else {
          router.push("/signin");
        }
      } catch (err) {
        console.log("error", err);
      }
    } else {
      alert("Password Doesnot Match");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="font-tiro">
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[80%] sm:w-3/4 m-auto  flex flex-wrap sm:flex-nowrap  shadow-lg shadow-red-600 justify-around text-center p-16 ">
          <div className="space-y-7 flex flex-wrap flex-col justify-center items-center">
            <div>
              <Image
                src="/images/logo.png"
                width={100}
                height={100}
                alt="logo"
              />
            </div>
            <div className="text-center space-y-1 2xl:text-2xl text-md font- text-xl font-semibold">
              <h1>স্বাগতম আবার!</h1>
              <p>আপনার অ্যাকাউন্টে সাইন আপ করুন অনুগ্রহ করে</p>
            </div>
            <div className="2xl:w-3/4 w-3/4">
              <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                <div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[#E81046]"
                    id="name"
                    type="text"
                    placeholder="নাম"
                    onChange={handleChange}
                    name="name"
                  />
                </div>
                <div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[#E81046]"
                    id="email"
                    type="email"
                    placeholder="ইমেইল"
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[#E81046]"
                    id="password"
                    type="password"
                    placeholder="পাসওয়ার্ড"
                    name="password"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[#E81046]"
                    id="password"
                    type="password"
                    placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                    name="confirmpassword"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#E81046] w-1/2 text-white  rounded-full mt-2"
                  >
                    লগইন
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="order-first sm:order-last lg:flex items-center hidden">
            <Image
              src="/images/signup.png"
              width={400}
              height={400}
              alt="logo"
              className="lg:w-[400px] md:w-[300px] 2xl:w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
