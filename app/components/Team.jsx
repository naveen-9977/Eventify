"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function TeamsCmp() {
  const [mentors, setMentors] = useState(undefined);

  const getMentors = async () => {
    let res = await fetch("http://localhost:3000/api/team");
    let data = await res.json();
    setMentors(data.data);
  };

  useEffect(() => {
    getMentors();
  }, []);

  return (
    <div className="mentors flex flex-wrap sm:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6 md:mt-14 lg:px-36 xl:px-56 2xl:px-72 justify-center lg:justify-between items-center">
      {mentors ? (
        mentors.map((item) => (
          <div className="mentor flex flex-col justify-center items-center">
            <Image
              src={`/${item.imageURL}`}
              height={200}
              width={200}
              className="h-16 md:h-24 md:w-24 w-16 object-cover object-top rounded-full"
            />
            <div className="name text-sm text-gray-700 mt-2 text-center">
              {item.name}
            </div>
          </div>
        ))
      ) : (
        <div className="md:flex justify-between items-center w-full grid grid-cols-2 gap-8 animate-pulse">
          <div className="mentor flex flex-col justify-center items-center">
            <div className="h-16 md:h-24 md:w-24 w-16 rounded-full bg-gray-800"></div>
            <div className="mt-3 h-4 w-[50%] md:w-full bg-gray-800"></div>
          </div>
          <div className="mentor flex flex-col justify-center items-center">
            <div className="h-16 md:h-24 md:w-24 w-16 rounded-full bg-gray-800"></div>
            <div className="mt-3 h-4 w-[50%] md:w-full bg-gray-800"></div>
          </div>
          <div className="mentor flex flex-col justify-center items-center">
            <div className="h-16 md:h-24 md:w-24 w-16 rounded-full bg-gray-800"></div>
            <div className="mt-3 h-4 w-[50%] md:w-full bg-gray-800"></div>
          </div>
          <div className="mentor flex flex-col justify-center items-center">
            <div className="h-16 md:h-24 md:w-24 w-16 rounded-full bg-gray-800"></div>
            <div className="mt-3 h-4 w-[50%] md:w-full bg-gray-800"></div>
          </div>
          <div className="mentor flex flex-col justify-center items-center">
            <div className="h-16 md:h-24 md:w-24 w-16 rounded-full bg-gray-800"></div>
            <div className="mt-3 h-4 w-[50%] md:w-full bg-gray-800"></div>
          </div>
        </div>
      )}
    </div>
  );
}
