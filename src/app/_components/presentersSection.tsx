"use client";
import { api } from "~/trpc/react";
import { BsArrowRepeat, BsShuffle } from "react-icons/bs";

const PresentersSection = ({
  weekId,
  weekLabel,
  isAdmin,
}: {
  weekId: string;
  weekLabel: string;
  isAdmin: boolean;
}) => {
  const utils = api.useUtils();
  const { data, isLoading } = api.presenter.getByWeek.useQuery({ weekId });

  const drawWeek = api.presenter.drawWeek.useMutation({
    onSuccess: async () => {
      await utils.presenter.getByWeek.invalidate({ weekId });
    },
    onError: () => alert("Error: could not draw presenters."),
  });
  const reroll = api.presenter.reroll.useMutation({
    onSuccess: async () => {
      await utils.presenter.getByWeek.invalidate({ weekId });
    },
    onError: (e) => alert(e.message || "Error: could not re-draw presenter."),
  });
  const clearWeek = api.presenter.clearWeek.useMutation({
    onSuccess: async () => {
      await utils.presenter.getByWeek.invalidate({ weekId });
    },
    onError: () => alert("Error: could not clear presenters."),
  });

  const busy = drawWeek.isPending || reroll.isPending || clearWeek.isPending;

  return (
    <aside className="rounded-2xl bg-neutral-800 p-4 text-white shadow-lg">
      <div className="mb-1 flex items-center gap-2">
        <BsShuffle className="text-neutral-400" />
        <h2 className="text-sm font-bold uppercase tracking-wide text-neutral-300">
          Saturday presenters
        </h2>
      </div>
      <p className="mb-3 text-xs text-neutral-500">{weekLabel}</p>

      {isAdmin && (
        <div className="mb-3 flex gap-2">
          <button
            disabled={busy}
            onClick={() => drawWeek.mutate({ weekId })}
            className="flex-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-neutral-900 hover:bg-neutral-200 disabled:opacity-50"
          >
            Draw
          </button>
          <button
            disabled={busy}
            onClick={() => {
              if (confirm("Clear all presenters for this week?"))
                clearWeek.mutate({ weekId });
            }}
            className="rounded-full border border-neutral-600 px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:bg-neutral-700 disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="py-4 text-center text-xs text-neutral-400">
          Loading...
        </div>
      ) : !data || data.length === 0 ? (
        <div className="py-4 text-center text-xs text-neutral-500">
          No problems yet.
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {data.map((row) => (
            <li
              key={row.problemId}
              className="flex items-center justify-between gap-2 rounded-lg bg-neutral-900/60 px-3 py-2"
            >
              <div className="flex min-w-0 flex-col">
                <a
                  href={row.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-xs font-semibold hover:underline"
                  title={row.name}
                >
                  {row.name}
                </a>
                {row.presenterName ? (
                  <span className="truncate text-xs font-bold text-green-400">
                    {row.presenterName}
                  </span>
                ) : (
                  <span className="text-xs text-neutral-500">
                    {row.eligibleCount === 0 ? "No solvers" : "Not assigned"}
                  </span>
                )}
              </div>
              {isAdmin && row.eligibleCount > 0 && (
                <button
                  disabled={busy}
                  onClick={() => reroll.mutate({ problemId: row.problemId })}
                  title="Re-draw this presenter"
                  className="shrink-0 text-neutral-400 hover:text-white disabled:opacity-50"
                >
                  <BsArrowRepeat size={16} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default PresentersSection;
