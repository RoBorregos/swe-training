"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoCheckmarkCircle, IoWarning } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";

const DISMISS_KEY = "onboardingDismissed";

export default function Onboarding() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [dismissed, setDismissed] = useState(true);
  const [handle, setHandle] = useState("");

  const { data, isLoading, refetch } = api.profile.getById.useQuery(
    userId ?? "",
    { enabled: !!userId },
  );

  const update = api.profile.update.useMutation();

  const trimmed = handle.trim();
  const { data: leetcodeData, isLoading: validating } =
    api.leetcode.getLeetcodeUserData.useQuery(
      { username: trimmed },
      { enabled: trimmed.length > 2 },
    );
  const isValid = trimmed.length > 2 && !!leetcodeData;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === "true");
    }
  }, []);

  if (status !== "authenticated" || !userId) return null;
  if (isLoading || !data) return null;

  const hasHandle = !!data.leetcodeUser && data.leetcodeUser.length > 0;
  if (hasHandle || dismissed) return null;

  const handleSave = async () => {
    if (!isValid) return;
    await update.mutateAsync({ id: userId, leetcodeUser: trimmed });
    await refetch();
  };

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "true");
    setDismissed(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-white shadow-2xl">
        <h2 className="text-2xl font-bold text-accent">
          Welcome to SWE Training!
        </h2>
        <p className="mt-1 text-sm text-gray-300">
          Before you start, set up your account in a few steps.
        </p>

        <ol className="mt-5 flex flex-col gap-3 text-sm">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-gray-900">
              1
            </span>
            <span>
              <strong>Set your LeetCode username</strong> (the validator). It is
              essential: without it your progress cannot be tracked.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-600 font-bold">
              2
            </span>
            <span>
              Go to <strong>Weekly Problems</strong> and solve the challenges
              directly on LeetCode. Each week unlocks on its date.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-600 font-bold">
              3
            </span>
            <span>
              Your progress is validated automatically: a problem only counts if
              you solved it <strong>on the day the week was released or later</strong>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-600 font-bold">
              4
            </span>
            <span>
              Check your position on the <strong>Leaderboard</strong>.
            </span>
          </li>
        </ol>

        <div className="mt-6">
          <label className="mb-1 block text-sm font-semibold text-gray-200">
            Your LeetCode username
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. your_handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="flex-1 rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleSave}
              disabled={!isValid || update.isPending}
              className={
                !isValid || update.isPending
                  ? "cursor-not-allowed rounded-full bg-gray-600 p-3"
                  : "rounded-full bg-accent p-3 transition hover:bg-accent-dark"
              }
            >
              {update.isPending ? (
                <AiOutlineLoading className="animate-spin text-xl" />
              ) : (
                <IoMdSend className="text-xl text-white" />
              )}
            </button>
          </div>

          <div className="mt-2 min-h-6 text-sm">
            {trimmed.length > 2 && validating && (
              <span className="flex items-center gap-2 text-blue-400">
                <AiOutlineLoading className="animate-spin" /> Validating handle...
              </span>
            )}
            {trimmed.length > 2 && !validating && isValid && (
              <span className="flex items-center gap-2 text-green-400">
                <IoCheckmarkCircle /> Valid handle
              </span>
            )}
            {trimmed.length > 2 && !validating && !isValid && (
              <span className="flex items-center gap-2 text-orange-400">
                <IoWarning /> We couldn&apos;t find that user on LeetCode
              </span>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleDismiss}
            className="text-sm text-gray-400 hover:text-white hover:underline"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
