"use client";
import React, { useState, useEffect } from "react";
import BlogsCmp from "../components/Blogs";

export default function BlogsPage() {
  const [currentBg, setCurrentBg] = useState(0);

  // Background images (store in /public/bg/)
  const bgImages = [
    "/bg/blogs-bg1.jpg",
    "/bg/blogs-bg2.jpg",
    "/bg/blogs-bg3.jpg",
  ];

  // Auto change every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev === bgImages.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative h-96 flex justify-center items-center flex-col mb-6 overflow-hidden">
        {/* Background carousel */}
        {bgImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        ))}

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="text-white m-auto text-center space-y-3 px-4 relative z-10">
          <div className="heading text-2xl font-bold sm:text-3xl">All Blogs</div>
          <div className="para md:text-lg">Read Blogs of Professionals.</div>
        </div>

        {/* Blogs label */}
        <div className="container bg-white text-center text-3xl font-bold py-4 md:py-6 rounded-t-xl md:rounded-t-3xl text-zinc-800 relative z-10">
          All Blogs
        </div>
      </div>

      <BlogsCmp />
    </>
  );
}
