"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import AboutSuspense from "./suspense/AboutSuspense";

export default function AboutCmp() {
  const [About, setAbout] = useState(undefined);

  const getAbout = async () => {
    let res = await fetch("http://localhost:3000/api/about");
    let data = await res.json();
    setAbout(data.data);
  };

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <div>
      <div className="mt-8 px-4 container m-auto lg:px-44">
        {About ? (
          <div className="space-y-20 my-8">
            <div className="flex flex-col xl:flex-row xl:items-center ">
              <div className="left xl:w-[60%] lg:pr-8">
                <div className="heading text-3xl font-bold my-6">
                  {About[0].mainTitle}
                </div>
                <div className="mt-4">{About[0].para1}</div>
                <div className="mt-4">{About[0].para2}</div>
              </div>
              <div className="text-center mt-6 lg:w-[40%] xl:rounded-lg overflow-hidden">
                <Image src="/about1.png" width={800} height={800} className="h-full object-cover" />
              </div>
            </div>
            <div className="mission">
              <div className="heading text-3xl font-bold my-6 text-center">
                OUR GOAL
              </div>
              <div className="flex flex-col xl:flex-row-reverse xl:items-center">
                <div className="left xl:w-[60%] lg:pl-8">
                  <div className="heading text-3xl font-bold my-6">
                    {About[0].secondaryTitle}
                  </div>
                  <div className="mt-4">{About[0].para3}</div>
                  <div className="mt-4">{About[0].para4}</div>
                </div>
                <div className="text-center mt-6 lg:w-[40%] xl:rounded-lg overflow-hidden">
                  <Image src="/about2.png" width={800} height={800} className="h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <AboutSuspense />
        )}
      </div>
    </div>
  );
}
