"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { BsTrash, BsCheckCircle } from "react-icons/bs";
import PresentersSection from "~/app/_components/presentersSection";

type Week = {
  id?: number | string;
  number?: number;
  title?: string;
};

type LeaderboardEntry = {
  userId?: string;
  username: string | null;
  isReviewer?: boolean;
  completedWarmup: number;
  completedMedium: number;
  completedHarder: number;
  completedInsane: number;
  total: number;
  place?: number;
};

const Leaderboard = () => {
  const { data: session } = useSession();
  const currentUsername = session?.user?.name ?? "";
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  const [selected, setSelected] = useState("all");
  const [archiveId, setArchiveId] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [editionLabel, setEditionLabel] = useState(
    new Date().getFullYear().toString(),
  );

  const utils = api.useUtils();

  const { data: weeksData, isLoading: weeksLoading } =
    api.week.getWeeksPublic.useQuery();

  const { data: editions } = api.leaderboard.getArchivedEditions.useQuery();

  const allQuery = api.leaderboard.getAll.useQuery(undefined, {
    enabled: !archiveId && selected === "all",
  });
  const weekQuery = api.leaderboard.getByWeek.useQuery(selected, {
    enabled: !archiveId && selected !== "all",
  });
  const archiveQuery = api.leaderboard.getArchivedLeaderboard.useQuery(
    { id: archiveId ?? "" },
    { enabled: !!archiveId },
  );

  const clearUserProgress = api.leaderboard.clearUserProgress.useMutation({
    onSuccess: async () => {
      await utils.leaderboard.invalidate();
    },
    onError: () => alert("Error: could not clear progress."),
  });

  const setReviewer = api.resume.setReviewer.useMutation({
    onSuccess: async () => {
      await utils.leaderboard.invalidate();
    },
    onError: () => alert("Error: could not change the reviewer role."),
  });

  const archiveAndReset = api.leaderboard.archiveAndReset.useMutation({
    onSuccess: async () => {
      await utils.leaderboard.invalidate();
      setShowReset(false);
    },
    onError: () => alert("Error: could not reset."),
  });

  const activeQuery = archiveId
    ? archiveQuery
    : selected === "all"
      ? allQuery
      : weekQuery;
  const leaderboardData = activeQuery.data;
  const leaderboardLoading = activeQuery.isLoading;
  const leaderboardError = activeQuery.error;

  const handleClearUser = (userId: string, username: string | null) => {
    if (confirm(`Clear the progress of ${username ?? "this user"}?`)) {
      clearUserProgress.mutate({ userId });
    }
  };

  const weekOptions = [
    { id: "all", label: "Global" },
    ...(weeksData
      ? weeksData.map((w: Week) => ({
          id: (w.id ?? w.number ?? "").toString(),
          label: `Week ${w.number}`,
        }))
      : []),
  ];

  // Presenters always refer to a concrete week. When "Global" (all) is selected
  // we fall back to the current week: the highest-numbered unlocked week (or the
  // highest-numbered week overall if none are unlocked yet). The weeks query has
  // no ordering, so we sort by `number` instead of trusting array order.
  const weeksByNumberDesc = weeksData
    ? [...weeksData].sort((a, b) => (b.number ?? 0) - (a.number ?? 0))
    : [];
  const currentWeek =
    weeksByNumberDesc.find((w) => !w.isLocked) ?? weeksByNumberDesc[0];

  const presenterWeek =
    selected !== "all"
      ? weekOptions.find((w) => w.id === selected)
      : currentWeek
        ? {
            id: (currentWeek.id ?? currentWeek.number ?? "").toString(),
            label: `Week ${currentWeek.number}`,
          }
        : undefined;

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
    <div className="mx-auto mt-12 max-w-3xl pb-20">
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-white drop-shadow">
        Leaderboard
      </h1>

      <div className="mb-4 flex justify-center">
        <div className="inline-flex flex-wrap justify-center rounded-full bg-neutral-800 p-1">
          {weekOptions.map((w) => (
            <button
              key={w.id}
              onClick={() => {
                setArchiveId(null);
                setSelected(w.id);
              }}
              className={`rounded-full px-5 py-2 font-semibold transition-all ${
                !archiveId && selected === w.id
                  ? "bg-white text-neutral-900 shadow"
                  : "text-white hover:bg-neutral-700"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      {editions && editions.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-neutral-400">Past editions:</span>
          {editions.map((e) => (
            <button
              key={e.id}
              onClick={() => setArchiveId(e.id)}
              className={`rounded-full px-4 py-1 text-sm font-semibold transition-all ${
                archiveId === e.id
                  ? "bg-white text-neutral-900 shadow"
                  : "bg-neutral-800 text-white hover:bg-neutral-700"
              }`}
            >
              {e.edition}
            </button>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowReset(true)}
            className="rounded-full border border-red-500/50 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-300 hover:bg-red-500/20"
          >
            Reset users (archive edition)
          </button>
        </div>
      )}

      {presenterWeek && (
        <div className="mb-6">
          <PresentersSection
            weekId={presenterWeek.id}
            weekLabel={presenterWeek.label}
            isAdmin={isAdmin}
          />
        </div>
      )}

      {weeksLoading || leaderboardLoading ? (
        <div className="py-10 text-center text-neutral-300">Loading...</div>
      ) : leaderboardError ? (
        <div className="py-10 text-center text-red-400">
          Error loading leaderboard
        </div>
      ) : (
        <>
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
                  {isAdmin && !archiveId && row.userId && (
                    <>
                      <button
                        onClick={() =>
                          setReviewer.mutate({
                            userId: row.userId!,
                            isReviewer: !row.isReviewer,
                          })
                        }
                        title={
                          row.isReviewer
                            ? "Remove as reviewer"
                            : "Mark as reviewer"
                        }
                        className={
                          row.isReviewer
                            ? "text-green-400 hover:text-green-300"
                            : "text-neutral-300 hover:text-green-400"
                        }
                      >
                        <BsCheckCircle />
                      </button>
                      <button
                        onClick={() =>
                          handleClearUser(row.userId!, row.username)
                        }
                        title="Clear this user's progress"
                        className="text-neutral-300 hover:text-red-400"
                      >
                        <BsTrash />
                      </button>
                    </>
                  )}
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
        </>
      )}

      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-6 text-white shadow-xl">
            <h2 className="mb-2 text-xl font-bold text-red-300">
              Reset users
            </h2>
            <p className="mb-4 text-sm text-neutral-300">
              The current ranking will be saved as an edition and then{" "}
              <strong>all users will be deleted</strong> along with their
              progress. Recommended when starting swe-training over.
            </p>
            <p className="mb-4 text-sm text-neutral-400">
              Deleted: users (except admins), their sessions/logins, their
              progress and admin comments. Admin accounts are kept. Weeks,
              problems and resources are <strong>not</strong> touched.
            </p>
            <label className="mb-1 block text-sm text-neutral-300">
              Edition name
            </label>
            <input
              type="text"
              value={editionLabel}
              onChange={(e) => setEditionLabel(e.target.value)}
              className="mb-4 w-full rounded border border-neutral-600 bg-neutral-800 px-3 py-2 text-white"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowReset(false)}
                className="rounded border border-neutral-600 px-4 py-2 text-white hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                disabled={!editionLabel.trim() || archiveAndReset.isPending}
                onClick={() =>
                  archiveAndReset.mutate({ edition: editionLabel.trim() })
                }
                className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-400 disabled:opacity-50"
              >
                Archive and reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;