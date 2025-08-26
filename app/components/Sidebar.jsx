"use client";

import { HiBars3 } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";
import { Source_Code_Pro } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

export default function SideBar() {
  let pathname = usePathname();
  console.log(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();


  const links = [
    {
      name: "Services",
      href: "/admin/services",
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
    },
    {
      name: "About Us",
      href: "/admin/about",
    },
    {
      name: "Enquiries",
      href: "/admin/contact",
    },
    {
      name: "Teams",
      href: "/admin/team",
    },
    // --- ADDED LINKS START ---
    {
      name: "Events",
      href: "/admin/events",
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
    },
    // --- ADDED LINKS END ---
  ];

  function handleHamburger() {
    setIsOpen(!isOpen);
  }


  async function removeToken() {
    let res = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
    });

    if (res.status === 200) {
      setTimeout(() => {
        router.push("/login");
      });
    } else {
      // will throw error
    }
  }

  return (
    <nav className="py-3 md:py-4 px-4">
      <div className="container m-auto flex items-center justify-start md:justify-between gap-6">
        <div id="mobi" className="flex items-center gap-4 md:hidden">
          <button
            className="forMobi md:hidden"
            onClick={() => {
              handleHamburger();
            }}
          >
            <HiBars3 size={30} />
          </button>
          <Link
            href={"/"}
            className={`${sourceCodePro.className} logo font-semibold text-xl lg:text-2xl text-fuchsia-500 tracking-tight`}
          >
            Eventify
          </Link>
          <div
            onClick={() => {
              handleHamburger();
            }}
            className={`${
              isOpen ? "flex" : "hidden"
            } overlay top-0 left-0 h-screen w-screen bg-black/40 z-[30] fixed`}
          ></div>
          <div
            className={`${
              isOpen ? "flex left-0" : "-left-[100%]"
            } flex-col sidebar fixed top-0 h-screen bg-white w-60 text-neutral-900 py-3 px-4 z-[40] transition-all duration-300 ease-in-out`}
          >
            <div className="header flex justify-start items-center">
              <button
                onClick={() => {
                  handleHamburger();
                }}
              >
                {" "}
                <HiOutlineX size={30} />{" "}
              </button>
            </div>
            <ul className="flex flex-col space-y-4 font-medium px-2 mt-4">
              {links.map((link, key) => (
                <li
                  key={key}
                  onClick={() => {
                    handleHamburger();
                  }}
                >
                  <Link href={link.href} className="block">
                    {link.name}
                  </Link>
                </li>
              ))}
              <button className="text-zinc-200 py-2 px-4 hover:text-gray-100 hover:bg-zinc-700 block rounded-md text-start bg-zinc-900 font-bold" onClick={()=>{removeToken()}}>Logout</button>
            </ul>
          </div>
        </div>
        <div
          id="desk"
          className="hidden md:flex w-1/4 lg:w-1/5 xl:w-1/6 h-full top-0 left-0 px-6 py-4 fixed flex-col gap-6 bg-gray-100"
        >
          <Link
            href={"/"}
            className={`${sourceCodePro.className} logo font-semibold text-xl lg:text-2xl text-fuchsia-500 tracking-tight`}
          >
            Eventify
          </Link>
          <ul className="flex flex-col gap-2 md:text-sm lg:text-base">
            {links.map((link, key) => (
              <li key={key}>
                <Link
                  href={link.href}
                  className={`text-zinc-600 py-3 px-4 hover:bg-gray-200 hover:text-zinc-900 block rounded-md ${
                    link.href == pathname && "font-bold bg-gray-200"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <button className="text-zinc-200 py-3 px-4 hover:text-gray-100 hover:bg-zinc-700 block rounded-md text-start bg-zinc-900 font-bold" onClick={()=>{removeToken()}}>Logout</button>
          </ul>
        </div>
      </div>
    </nav>
  );
}