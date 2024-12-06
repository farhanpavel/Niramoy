"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [blogs, setBlogs] = useState([]);

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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRUblYSdfdjtJ1R-9XCl5qjzVnbo-ScoOWA&s" // Replace with dynamic image URL if needed
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {blog.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {blog.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
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
                </a>
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
