"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

const Leaderboard = () => {
  const [selected, setSelected] = useState("all");

  // Fetch weeks for the slider
  const { data: weeksData, isLoading: weeksLoading } = api.week.getWeeks.useQuery();

  // Fetch leaderboard data
  const {
    data: leaderboardData,
    isLoading: leaderboardLoading,
    error: leaderboardError,
  } = selected === "all"
    ? api.leaderboard.getAll.useQuery()
    : api.leaderboard.getByWeek.useQuery(selected);

  if (weeksLoading || leaderboardLoading) return <div>Loading...</div>;
  if (leaderboardError) return <div>Error loading leaderboard</div>;

  // Prepare week options
  const weekOptions = [
    { id: "all", label: "Global" },
    ...(weeksData
      ? weeksData.map((w: any) => ({ id: w.id?.toString() ?? w.number?.toString(), label: w.title || `Week ${w.number}` }))
      : []),
  ];

  // Sort leaderboard
  const sorted = [...(leaderboardData ?? [])].sort((a, b) => b.total - a.total);

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight text-white drop-shadow">
        Leaderboard
      </h1>
      {/* Slider/toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex bg-neutral-800 rounded-full p-1">
          {weekOptions.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelected(w.id)}
              className={`px-5 py-2 rounded-full font-semibold transition-all ${
                selected === w.id
                  ? "bg-white text-neutral-900 shadow"
                  : "text-white hover:bg-neutral-700"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
      {/* Table header */}
      <div className="w-full flex flex-row justify-between bg-neutral-800 text-white rounded-t-2xl px-8 py-3 text-lg font-semibold mb-2">
        <span className="w-1/4 text-left">User</span>
        <span className="w-1/8 text-center">Warmup</span>
        <span className="w-1/8 text-center">Little Harder</span>
        <span className="w-1/8 text-center">Harder</span>
        <span className="w-1/8 text-center">Insane</span>
        <span className="w-1/8 text-center">Total</span>
      </div>
      <ol className="flex flex-col gap-4">
        {sorted.map((row, i) => (
          <li
            key={i}
            className={`w-full bg-neutral-700 text-white rounded-2xl shadow-lg px-8 py-4 flex flex-row items-center justify-between transition-all
              ${i === 0 ? "bg-gray-700 font-bold scale-[1.03]" : ""}
              ${row.username === "You" ? "bg-green-600 font-bold" : ""}
            `}
          >
            <div className="w-1/4 flex items-center gap-3">
              <span className="text-xl font-semibold w-8 text-gray-400 text-center">{i + 1}</span>
              <span className="text-base font-medium break-words leading-tight">{row.username}</span>
            </div>
            <span className="w-1/8 text-center text-lg font-bold">{row.completedWarmup}</span>
            <span className="w-1/8 text-center text-lg font-bold">{row.completedLittleHarder}</span>
            <span className="w-1/8 text-center text-lg font-bold">{row.completedHarder}</span>
            <span className="w-1/8 text-center text-lg font-bold">{row.completedInsane}</span>
            <span className="w-1/8 text-center text-lg font-bold">{row.total}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;