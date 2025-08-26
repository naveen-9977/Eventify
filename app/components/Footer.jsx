import Link from 'next/link';
import React from 'react';
import { FaRegCalendarCheck, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

export default function Footer() {
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "Blogs", href: "/blogs" },
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" }
    ];

    const socialLinks = [
        { icon: <FaInstagram />, href: "https://instagram.com" },
        { icon: <FaTwitter />, href: "https://twitter.com" },
        { icon: <FaFacebookF />, href: "https://facebook.com" }
    ];

    return (
        <footer className="bg-black text-gray-300 mt-16">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
                    {/* Logo and About Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                            <FaRegCalendarCheck className="text-fuchsia-500" size={30} />
                            <span className="text-white font-semibold text-2xl tracking-tight">Eventify</span>
                        </div>
                        <p className="text-sm max-w-md mx-auto md:mx-0">
                            Your trusted partner for creating unforgettable events. From corporate functions to personal celebrations, we handle every detail with passion and precision.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-sm hover:text-fuchsia-500 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info Section */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Contact Us</h3>
                        <address className="text-sm not-italic space-y-2">
                            <p>123 Event Lane, Celebration City, 12345</p>
                            <p>
                                <a href="mailto:contact@eventify.com" className="hover:text-fuchsia-500 transition-colors">
                                    contact@eventify.com
                                </a>
                            </p>
                            <p>
                                <a href="tel:+1234567890" className="hover:text-fuchsia-500 transition-colors">
                                    (123) 456-7890
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <div className="flex justify-center gap-4 mb-4">
                        {socialLinks.map((social, index) => (
                            <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-500 transition-colors">
                                {React.cloneElement(social.icon, { size: 20 })}
                            </a>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Eventify. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}