"use client";

import logo from "public/images/Logo.png";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    "none" | "start" | "create"
  >("none");
  const [selectedDifficulties, setSelectedDifficulties] = useState<{
    easy: boolean;
    medium: boolean;
    hard: boolean;
  }>({
    easy: true,
    medium: true,
    hard: true,
  });

  const handleSectionClick = (section: "start" | "create") => {
    setActiveSection(activeSection === section ? "none" : section);
  };

  const handleDifficultyChange = (difficulty: "easy" | "medium" | "hard") => {
    setSelectedDifficulties((prev) => ({
      ...prev,
      [difficulty]: !prev[difficulty],
    }));
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Start Section */}
      <div
        className={`absolute left-0 top-0 flex h-full cursor-pointer flex-col items-center justify-center gap-y-4 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-700 ease-in-out ${
          activeSection === "none"
            ? "w-1/2"
            : activeSection === "start"
              ? "z-10 w-full"
              : "w-0 -translate-x-full"
        }`}
        onClick={() => handleSectionClick("start")}
      >
        <div
          className="text-center"
          onClick={(e) => {
            if (activeSection !== "none") {
              e.stopPropagation();
            }
          }}
        >
          <h1 className="text-6xl font-bold tracking-wider text-white transition-transform duration-300 hover:scale-105 md:text-8xl">
            Start
          </h1>
          {activeSection !== "start" && (
            <button className="mt-4 animate-fade-in text-xl text-white/80 opacity-0">
              New Duel
            </button>
          )}

          {activeSection === "start" && (
            <div className="mt-6 flex animate-fade-in flex-col items-center space-y-4">
              <h3 className="animate-fade-in text-lg font-semibold text-white/90 opacity-0">
                Select Difficulty
              </h3>
              <div className="flex flex-col space-y-3">
                {/* Easy Checkbox */}
                <label
                  className="group flex animate-fade-in cursor-pointer items-center space-x-3 opacity-0"
                  style={{ animationDelay: "0.2s" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.easy}
                    onChange={() => handleDifficultyChange("easy")}
                    className="h-5 w-5 rounded border-white/30 bg-white/20 text-green-500 transition-all duration-200 focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-lg font-medium text-green-400 transition-all duration-200 group-hover:text-green-300">
                    Easy
                  </span>
                </label>

                {/* Medium Checkbox */}
                <label
                  className="group flex animate-fade-in cursor-pointer items-center space-x-3 opacity-0"
                  style={{ animationDelay: "0.4s" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.medium}
                    onChange={() => handleDifficultyChange("medium")}
                    className="h-5 w-5 rounded border-white/30 bg-white/20 text-yellow-500 transition-all duration-200 focus:ring-2 focus:ring-yellow-500"
                  />
                  <span className="text-lg font-medium text-yellow-400 transition-all duration-200 group-hover:text-yellow-300">
                    Medium
                  </span>
                </label>

                {/* Hard Checkbox */}
                <label
                  className="group flex animate-fade-in cursor-pointer items-center space-x-3 opacity-0"
                  style={{ animationDelay: "0.6s" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedDifficulties.hard}
                    onChange={() => handleDifficultyChange("hard")}
                    className="h-5 w-5 rounded border-white/30 bg-white/20 text-red-500 transition-all duration-200 focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-lg font-medium text-red-400 transition-all duration-200 group-hover:text-red-300">
                    Hard
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* New Duel Button - appears at bottom when start section is active */}
        {activeSection === "start" && (
          <div
            className="transform animate-fade-in opacity-0"
            style={{ animationDelay: "0.8s" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="rounded-lg border border-white/30 bg-white/20 px-8 py-4 text-xl font-semibold text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30"
              onClick={() => {
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                let result = "";
                for (let i = 0; i < 6; i++) {
                  result += characters.charAt(
                    Math.floor(Math.random() * characters.length),
                  );
                }

                const params = new URLSearchParams();
                if (selectedDifficulties.easy) params.append("easy", "true");
                if (selectedDifficulties.medium)
                  params.append("medium", "true");
                if (selectedDifficulties.hard) params.append("hard", "true");
                window.location.href = `/roboleetcode/${result}?${params.toString()}`;
              }}
            >
              New Duel
            </button>
          </div>
        )}
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
          <p className="mt-4 animate-fade-in text-xl text-white/80 opacity-0">
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
    </div>
  );
}
