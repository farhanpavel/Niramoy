"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Page() {
  const [blog, setBlogs] = useState({});
  const blogid = Cookies.get("blogid");
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/blog/${blogid}`
        );
        const data = await response.json();
        setBlogs(data); // Set the fetched blog to state
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlogs();
  }, [blogid]);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <article className="max-w-3xl mx-auto  p-4 rounded-lg">
        <Image
          src={blog.imageUrl}
          alt={blog.title}
          width={800}
          height={450}
          className="w-full h-64 object-cover rounded-t-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-[#E81046] mb-4 text-center">
          {blog.title}
        </h1>
        <p className="text-gray-700 mb-6">{blog.description}</p>
        {/* You can add more elements here like author, date, tags, etc. */}
      </article>
    </div>
  );
}
