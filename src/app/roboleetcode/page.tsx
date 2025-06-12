"use client";

import logo from "public/images/Logo.png";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    "none" | "start" | "create"
  >("none");

  const handleSectionClick = (section: "start" | "create") => {
    setActiveSection(activeSection === section ? "none" : section);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Start Section */}
      <div
        className={`absolute left-0 top-0 flex h-full cursor-pointer items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-700 ease-in-out ${
          activeSection === "none"
            ? "w-1/2"
            : activeSection === "start"
              ? "z-10 w-full"
              : "w-0 -translate-x-full"
        }`}
        onClick={() => handleSectionClick("start")}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-wider text-white transition-transform duration-300 hover:scale-105 md:text-8xl">
            START
          </h1>
          <p className="animate-fade-in mt-4 text-xl text-white/80 opacity-0">
            Duel another member
          </p>
        </div>
      </div>

      {/* Create Section */}
      <div
        className={`absolute right-0 top-0 flex h-full cursor-pointer items-center justify-center bg-gradient-to-l from-purple-600 to-purple-800 transition-all duration-700 ease-in-out ${
          activeSection === "none"
            ? "w-1/2"
            : activeSection === "create"
              ? "z-10 w-full"
              : "w-0 translate-x-full"
        }`}
        onClick={() => handleSectionClick("create")}
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-wider text-white transition-transform duration-300 hover:scale-105 md:text-8xl">
            Join
          </h1>
          <p className="animate-fade-in mt-4 text-xl text-white/80 opacity-0">
            Enter an existing duel
          </p>
        </div>
      </div>

      {/* Close button when a section is active */}
      {activeSection !== "none" && (
        <button
          onClick={() => setActiveSection("none")}
          className="absolute right-6 top-6 z-20 text-white transition-colors duration-200 hover:text-gray-300"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Logo overlay */}
      <div className="absolute left-6 top-6 z-20">
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className="opacity-80"
        />
      </div>
    </div>
  );
}
