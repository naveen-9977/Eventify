"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogsCmp() {
  const [blogs, setBlogs] = useState(undefined);
  const [loaded, setLoaded] = useState(false);

  const getBlogs = async () => {
    let res = await fetch("http://localhost:3000/api/blogs");
    let data = await res.json();
    setBlogs(data.data);
    setLoaded(true);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="flex flex-col gap-6 px-4 md:px-0">
      { loaded && blogs.length == 0 ? <div className="flex items-center justify-center h-[50vh]">
          <div className="">No Entries found</div>
        </div>:
      blogs?.map((item) => (
        <Link
          href={`/blogs/${item._id}`}
          className="box flex flex-col sm:flex-row py-4 lg:mx-28 xl:mx-36 2xl:mx-48 ring-1 ring-zinc-200 px-3 rounded-lg"
        >
          <div className="left">
            {/* This is the line that was fixed.
              I removed the extra "/" from src={`/${item.imageUrl}`}.
            */}
            <Image
              src={item.imageUrl}
              height={150}
              width={150}
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
          <div className="right mt-4 space-y-2 sm:mt-0 sm:py-4 sm:px-4 flex flex-col sm:w-full">
            <div className="title font-semibold text-lg">{item.title}</div>
            <div className="para text-zinc-600">{item.description}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}