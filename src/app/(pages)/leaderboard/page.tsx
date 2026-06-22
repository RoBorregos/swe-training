"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import { BsTrash, BsCheckCircle } from "react-icons/bs";

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
    onError: () => alert("Error: no se pudo limpiar el progreso."),
  });

  const setReviewer = api.resume.setReviewer.useMutation({
    onSuccess: async () => {
      await utils.leaderboard.invalidate();
    },
    onError: () => alert("Error: no se pudo cambiar el rol de reviewer."),
  });

  const archiveAndReset = api.leaderboard.archiveAndReset.useMutation({
    onSuccess: async () => {
      await utils.leaderboard.invalidate();
      setShowReset(false);
    },
    onError: () => alert("Error: no se pudo reiniciar."),
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
    if (confirm(`¿Limpiar el progreso de ${username ?? "este usuario"}?`)) {
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
          <span className="text-sm text-neutral-400">Ediciones pasadas:</span>
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
            Reiniciar usuarios (archivar edición)
          </button>
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
                            ? "Quitar como reviewer"
                            : "Marcar como reviewer"
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
                        title="Limpiar progreso de este usuario"
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
              Reiniciar usuarios
            </h2>
            <p className="mb-4 text-sm text-neutral-300">
              Se guardará el ranking actual como edición y luego se{" "}
              <strong>eliminarán todos los usuarios</strong> y su progreso.
              Recomendado al iniciar de nuevo swe-training.
            </p>
            <p className="mb-4 text-sm text-neutral-400">
              Se eliminan: usuarios (excepto admins), sus sesiones/logins, su
              progreso y los comentarios del admin. Las cuentas admin se
              conservan. Las semanas, problemas y recursos <strong>no</strong> se
              tocan.
            </p>
            <label className="mb-1 block text-sm text-neutral-300">
              Nombre de la edición
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
                Cancelar
              </button>
              <button
                disabled={!editionLabel.trim() || archiveAndReset.isPending}
                onClick={() =>
                  archiveAndReset.mutate({ edition: editionLabel.trim() })
                }
                className="rounded bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-400 disabled:opacity-50"
              >
                Archivar y reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
