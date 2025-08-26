"use client"

import { HiBars3 } from "react-icons/hi2";
import { HiOutlineX } from "react-icons/hi";
import Link from 'next/link';
import { useState } from 'react';
import { FaRegCalendarCheck } from "react-icons/fa"; // Import an icon

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    const links = [{
        name: "Home",
        href: "/"
    }, {
        name: "Services",
        href: "/services"
    }, {
        name: "Blogs",
        href: "/blogs"
    }, 
        { name: "Events", href: "/events"}, // Added this line
        { name: "Track Booking", href: "/track" } ,// <-- Add this line

    {
        name: "About Us",
        href: "/about"
    }, {
        name: "Contact Us",
        href: "/contact"
    }
    ]

    function handleHamburger() {
        setIsOpen(!isOpen)
    }

    return (
        <nav className="py-3 md:py-6 px-4 sticky top-0 z-50 bg-black">
            <div className="container m-auto flex items-center justify-between ">
                {/* Replaced Image component with a styled logo */}
                <Link href={"/"} className="flex items-center gap-2">
                    <FaRegCalendarCheck className="text-fuchsia-500" size={30} />
                    <span className="text-white font-semibold text-xl tracking-tight">Eventify</span>
                </Link>
                
                <button className="forMobi md:hidden" onClick={() => { handleHamburger() }}><HiBars3 size={30} className="text-white" /></button>
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
                    isOpen ? "flex right-0" : "-right-[100%]"
                  } flex-col sidebar fixed top-0 h-screen bg-white w-60 text-neutral-900 py-3 px-4 z-[40] transition-all duration-300 ease-in-out`}
                >
                    <div className="header flex justify-end items-center">
                        <button onClick={() => { handleHamburger() }}> <HiOutlineX size={30} /> </button>
                    </div>
                    <ul className="flex flex-col space-y-4 font-medium px-2 mt-4">
                        {links.map((link, key) => (
                            <li key={key} onClick={() => { handleHamburger() }}>
                                <Link href={link.href} className="" >{link.name}</Link>
                            </li>
                        ))}
                         <li onClick={() => { handleHamburger() }}>
                            <Link href="/login" className="bg-fuchsia-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-fuchsia-600">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
                <ul className="hidden md:flex gap-7 md:text-sm lg:text-base items-center">
                    {links.map((link, key) => (
                        <li key={key}>
                            <Link href={link.href} className="text-white hover:text-fuchsia-400" >{link.name}</Link>
                        </li>
                    ))}
                     <li>
                        <Link href="/login">
                            <button className="bg-fuchsia-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-fuchsia-600">
                                Login
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}