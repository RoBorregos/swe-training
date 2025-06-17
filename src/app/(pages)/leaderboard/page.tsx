"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
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
  // Get current username
  const { data: session } = useSession();
  const currentUsername = session?.user?.name ?? "";

  const [selected, setSelected] = useState("all");

  // Fetch weeks for the slider
  const { data: weeksData, isLoading: weeksLoading } =
    api.week.getWeeks.useQuery();

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
      <div className="mx-auto mt-12 max-w-3xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-white drop-shadow">
          Leaderboard
        </h1>
        <div className="mb-6 flex justify-center">
          <div className="inline-flex rounded-full bg-neutral-800 p-1">
            <span className="animate-pulse rounded-full bg-neutral-700 px-5 py-2 font-semibold text-gray-100">
              Loading...
            </span>
          </div>
        </div>
        <div className="mb-2 flex w-full flex-row justify-between rounded-t-2xl bg-neutral-800 px-8 py-3 text-lg font-semibold text-white">
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

  const sorted = [...((leaderboardData as LeaderboardEntry[]) ?? [])].sort(
    (a, b) => b.total - a.total,
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
    <div className="mx-auto mt-12 max-w-3xl">
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-white drop-shadow">
        Leaderboard
      </h1>
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full bg-neutral-800 p-1">
          {weekOptions.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelected(w.id)}
              className={`rounded-full px-5 py-2 font-semibold transition-all ${
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
      <div className="mb-2 flex w-full flex-row justify-between rounded-t-2xl bg-neutral-800 px-8 py-3 text-lg font-semibold text-white">
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
            className={`flex w-full flex-row items-center justify-between rounded-2xl px-8 py-4 text-white shadow-lg transition-all ${row.place !== 1 && row.username !== currentUsername ? "bg-neutral-700" : ""} ${row.place === 1 ? "scale-[1.03] bg-gray-600 font-bold" : ""} ${row.username === currentUsername ? "bg-green-600 font-bold" : ""} `}
          >
            <div className="flex w-1/4 items-center gap-3">
              <span className="w-8 text-center text-xl font-semibold text-gray-400">
                {row.place}
              </span>
              <span className="break-words text-base font-medium leading-tight">
                {row.username}
              </span>
            </div>
            <span className="w-1/8 text-center text-lg font-bold">
              {row.completedWarmup}
            </span>
            <span className="w-1/8 text-center text-lg font-bold">
              {row.completedMedium}
            </span>
            <span className="w-1/8 text-center text-lg font-bold">
              {row.completedHarder}
            </span>
            <span className="w-1/8 text-center text-lg font-bold">
              {row.completedInsane}
            </span>
            <span className="w-1/8 text-center text-lg font-bold">
              {row.total}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
