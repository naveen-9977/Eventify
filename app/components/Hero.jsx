"use client";  // 👈 this line must be first

import React, { useState, useEffect } from "react";
import "./styles/LandingPage.css"; // adjust path if needed

// If images are in public/images, use direct paths:
const carouselImages = [
  "/images/hero1.jpg",
  "/images/hero6.jpg",
  "/images/hero5.jpg",
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselImages.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-carousel">
        {carouselImages.map((img, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-content">
          <h2>Craft Your Dream Event</h2>
          <h1>We Take Care of the Details</h1>
          <p>
            Turn your vision into a reality. We are a full-service event
            management company dedicated to creating unforgettable experiences.
            From concept to execution, we handle everything – venue sourcing,
            vendor coordination, logistics, and more. Let us make your event a
            success, so you can focus on enjoying the moment.
          </p>
          <div className="hero-actions">
            <button className="primary-btn">Contact Us</button>
            <button className="secondary-btn">
              Know More <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
