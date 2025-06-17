"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

type Week = {
  id?: number | string;
  number?: number;
  title?: string;
};

type LeaderboardEntry = {
  username: string;
  completedWarmup: number;
  completedMedium: number;
  completedHarder: number;
  completedInsane: number;
  total: number;
};

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

  if (weeksLoading || leaderboardLoading) {
    return (
      <div className="max-w-3xl mx-auto mt-12">
        <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight text-white drop-shadow">
          Leaderboard
        </h1>
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-neutral-800 rounded-full p-1">
            <span className="px-5 py-2 rounded-full font-semibold bg-neutral-700 text-gray-100 animate-pulse">
              Loading...
            </span>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between bg-neutral-800 text-white rounded-t-2xl px-8 py-3 text-lg font-semibold mb-2">
          <span className="w-1/4 text-left">User</span>
          <span className="w-1/8 text-center">Warmup</span>
          <span className="w-1/8 text-center">Medium</span>
          <span className="w-1/8 text-center">Harder</span>
          <span className="w-1/8 text-center">Insane</span>
          <span className="w-1/8 text-center">Total</span>
        </div>
      </div>
    );
  }

  if (leaderboardError) return <div>Error loading leaderboard</div>;

  const weekOptions = [
    { id: "all", label: "Global" },
    ...(weeksData
      ? weeksData.map((w: Week) => ({
          id: (w.id ?? w.number ?? "").toString(),
          label: w.title ?? `Week ${w.number}`,
        }))
      : []),
  ];

  const sorted = [...(leaderboardData as LeaderboardEntry[] ?? [])].sort(
    (a, b) => b.total - a.total
  );

  let lastTotal: number | null = null;
  let lastPlace = 0;

  const sortedWithPlace = sorted.map((row: LeaderboardEntry, i) => {
    if (row.total !== lastTotal) {
      lastPlace = i + 1;
      lastTotal = row.total;
    }
    return { ...row, place: lastPlace };
  });

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h1 className="text-3xl font-extrabold mb-8 text-center tracking-tight text-white drop-shadow">
        Leaderboard
      </h1>
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
      <div className="w-full flex flex-row justify-between bg-neutral-800 text-white rounded-t-2xl px-8 py-3 text-lg font-semibold mb-2">
        <span className="w-1/4 text-left">User</span>
        <span className="w-1/8 text-center">Warmup</span>
        <span className="w-1/8 text-center">Medium</span>
        <span className="w-1/8 text-center">Harder</span>
        <span className="w-1/8 text-center">Insane</span>
        <span className="w-1/8 text-center">Total</span>
      </div>
      <ol className="flex flex-col gap-4">
        {sortedWithPlace.map((row, i) => (
          <li
            key={i}
            className={`w-full bg-neutral-700 text-white rounded-2xl shadow-lg px-8 py-4 flex flex-row items-center justify-between transition-all
              ${row.place === 1 ? "bg-gray-700 font-bold scale-[1.03]" : ""}
              ${row.username === "You" ? "bg-green-600 font-bold" : ""}
            `}
          >
            <div className="w-1/4 flex items-center gap-3">
              <span className="text-xl font-semibold w-8 text-gray-400 text-center">{row.place}</span>
              <span className="text-base font-medium break-words leading-tight">{row.username}</span>
            </div>
            <span className="w-1/8 text-center text-lg font-bold">{row.completedWarmup}</span>
            <span className="w-1/8 text-center text-lg font-bold">{row.completedMedium}</span>
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
