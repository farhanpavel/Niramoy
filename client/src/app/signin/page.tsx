"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function Page() {
  const [isvalid, setvalid] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const { email, password } = user;
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((x) => ({
      ...x,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/user/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        if (response.status === 401) {
          setvalid(true);
        } else {
          throw new Error("invalid");
        }
        return;
      }
      setvalid(false);
      const data = await response.json();
      console.log(data);
      Cookies.set("id", data.id);
      if (data.role === "patient" && data.status == 0) {
        router.push("/ai");
      } else {
        router.push("/patientdashboard/overview");
      }
    } catch (err) {
      console.log("error", err);
    }
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
              <p>আপনার অ্যাকাউন্টে লগইন করুন অনুগ্রহ করে</p>
            </div>
            <div className="2xl:w-3/4 w-3/4">
              <form
                action=""
                className="flex flex-col gap-y-2"
                onSubmit={handleSubmit}
              >
                <input
                  type="email"
                  name="email"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="ইমেইল"
                  onChange={handleChange}
                />
                {isvalid && (
                  <div className="text-left text-sm text-red-600 mx-1">
                    <p>ভুল ইমেইল</p>
                  </div>
                )}
                <input
                  type="password"
                  name="password"
                  className="border-[1px] border-gray-300 p-2 text-[#4a4a4a] rounded-[5px] bg-[#F0F4F4]"
                  placeholder="পাসওয়ার্ড"
                  onChange={handleChange}
                />
                {isvalid && (
                  <div className="text-left text-sm text-red-600 mx-1">
                    <p>ভুল পাসওয়ার্ড</p>
                  </div>
                )}
                <div className="space-x-3">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#E81046] w-1/2 text-white  rounded-full mt-2"
                  >
                    লগইন
                  </button>
                </div>
              </form>
              <div>
                <h1 className="text-sm mx-5  text-center mt-4  ">
                  <p>পাসওয়ার্ড ভুলে গেছেন?</p>

                  <Link href={"/signup"} className="font-bold text-[#E81046]">
                    সাইন আপ
                  </Link>
                </h1>
              </div>
            </div>
          </div>
          <div className="order-first sm:order-last lg:flex items-center hidden">
            <Image
              src="/images/signin.png"
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
