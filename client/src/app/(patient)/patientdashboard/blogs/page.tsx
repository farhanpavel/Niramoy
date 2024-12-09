"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const handleClick = (e) => {
    Cookies.set("blogid", e);
    router.push("/patientdashboard/blogs/data");
  };

  // Fetch blog data from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/blog");
        const data = await response.json();
        setBlogs(data); // Set the fetched blogs to state
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="font-tiro">
      <div className="flex justify-between items-center py-5 px-4 bg-gray-100">
        <div></div>

        <div className="text-4xl text-center text-[#4a4a4a] border-b-2 border-[#E81046]">
          <h1>ব্লগ সমূহ</h1>
        </div>

        <div>
          <button className="bg-[#E81046] text-white px-4 py-2 rounded hover:bg-[#c70e3b]">
            <Link href="/patientdashboard/blogs/new"> ব্লগ তৈরি করুন</Link>
          </button>
        </div>
      </div>

      {/* Card Fetch Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog.userId}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg"
                  src={`${blog.imageUrl}`}
                  alt={blog.title}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {blog.description.substring(0, 250)}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => handleClick(blog.blog_id)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#E81046] rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    আরও পড়ুন
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No blogs available</p>
        )}
      </div>
    </div>
  );
}
