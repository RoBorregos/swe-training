"use client";
import { api } from "~/trpc/react";
import {
  BsArrowsExpand,
  BsArrowsCollapse,
  BsCartPlusFill,
  BsPencilSquare,
  BsPlus,
  BsTrash,
} from "react-icons/bs";
import Subtitle from "~/app/_components/subtitle";
import AdminViewRow from "~/app/_components/admin/adminViewRow";
import type { Prisma, Week } from "@prisma/client";
import { useState } from "react";
import {
  dateToMonterreyInput,
  formatMonterrey,
  monterreyInputToDate,
} from "~/util/timezone";

type ProblemWithSolvedBy = Prisma.ProblemGetPayload<{
  include: { solvedBy: true };
}>;

interface AdminViewBlockProps {
  week: Week;
  problems: ProblemWithSolvedBy[];
}

const AdminViewBlock = ({ week, problems }: AdminViewBlockProps) => {
  const [newResourceTitle, setNewResourceTitle] = useState("");
  const [newResourceUrl, setNewResourceUrl] = useState("");
  const [editingResourceId, setEditingResourceId] = useState<string | null>(
    null,
  );
  const [editResourceTitle, setEditResourceTitle] = useState("");
  const [editResourceUrl, setEditResourceUrl] = useState("");
  const [showResources, setShowResources] = useState(false);
  const [unlockInput, setUnlockInput] = useState(
    week.unlockDate ? dateToMonterreyInput(new Date(week.unlockDate)) : "",
  );

  const utils = api.useUtils();

  // Fetch week with resources
  const { data: weekWithResources } = api.week.getWeekPublic.useQuery({
    id: week.id,
  });

  const changeWeekTitle = api.week.changeWeekTitle.useMutation({
    onSuccess: async () => {
      await utils.week.invalidate();
    },
    onError: () => {
      alert("Error: Could not update week title.");
    },
  });

  const handleWeekTitleChange = () => {
    const nt = prompt("Enter new title:");
    if (!nt) {
      return;
    }
    changeWeekTitle.mutate({ id: week.id || "", title: nt });
  };

  const setWeekUnlockDate = api.week.setWeekUnlockDate.useMutation({
    onSuccess: async () => {
      await utils.week.invalidate();
    },
    onError: () => {
      alert(`Error: Could not update the unlock date.`);
    },
  });

  const createFromSlug = api.problem.createFromSlug.useMutation({
    onSuccess: async (data) => {
      if (data) {
        await utils.problem.invalidate();
      } else {
        alert("Problem does not exist or could not be found.");
      }
    },
    onError: () => {
      alert(`Error: Could not create problem.`);
    },
  });

  const addDetailResource = api.week.addDetailResource.useMutation({
    onSuccess: async () => {
      await utils.week.invalidate();
      setNewResourceTitle("");
      setNewResourceUrl("");
    },
    onError: () => {
      alert("Error: Could not add resource.");
    },
  });

  const updateDetailResource = api.week.updateDetailResource.useMutation({
    onSuccess: async () => {
      await utils.week.invalidate();
      setEditingResourceId(null);
      setEditResourceTitle("");
      setEditResourceUrl("");
    },
    onError: () => {
      alert("Error: Could not update resource.");
    },
  });

  const deleteDetailResource = api.week.deleteDetailResource.useMutation({
    onSuccess: async () => {
      await utils.week.invalidate();
    },
    onError: () => {
      alert("Error: Could not delete resource.");
    },
  });

  const handleSchedule = () => {
    if (!unlockInput) {
      alert("Selecciona una fecha y hora.");
      return;
    }
    setWeekUnlockDate.mutate({
      id: week.id,
      unlockDate: monterreyInputToDate(unlockInput),
    });
  };

  const handleClearSchedule = () => {
    setUnlockInput("");
    setWeekUnlockDate.mutate({ id: week.id, unlockDate: null });
  };

  const isLocked =
    !week.unlockDate || new Date(week.unlockDate).getTime() > Date.now();

  const newSlugIn = () => {
    const ns = prompt("Leetcode title slug:");
    if (!ns) {
      return;
    }
    createFromSlug.mutate({ slug: ns, weekId: week.id });
  };

  const handleAddResource = () => {
    if (!newResourceTitle.trim() || !newResourceUrl.trim()) {
      alert("Please enter both title and URL.");
      return;
    }
    addDetailResource.mutate({
      weekId: week.id,
      title: newResourceTitle.trim(),
      url: newResourceUrl.trim(),
    });
  };

  const handleEditResource = (resourceId: string) => {
    const resource = weekWithResources?.detailResources.find(
      (r) => r.id === resourceId,
    );
    if (resource) {
      setEditingResourceId(resourceId);
      setEditResourceTitle(resource.title);
      setEditResourceUrl(resource.url);
    }
  };

  const handleSaveEdit = () => {
    if (!editResourceTitle.trim() || !editResourceUrl.trim()) {
      alert("Please enter both title and URL.");
      return;
    }
    updateDetailResource.mutate({
      id: editingResourceId!,
      title: editResourceTitle.trim(),
      url: editResourceUrl.trim(),
    });
  };

  const handleCancelEdit = () => {
    setEditingResourceId(null);
    setEditResourceTitle("");
    setEditResourceUrl("");
  };

  const handleDeleteResource = (resourceId: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      deleteDetailResource.mutate({ id: resourceId });
    }
  };

  problems = problems.filter((p) => p.weekId == week.id);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button title="Buy more problems" onClick={newSlugIn}>
          <BsCartPlusFill className="fill-neutral-400 hover:fill-accent" />
        </button>
        <button title="Change week title" onClick={handleWeekTitleChange}>
          <BsPencilSquare className="fill-neutral-400 hover:fill-accent" />
        </button>
        <Subtitle label={week.title} />
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isLocked
              ? "bg-red-500/20 text-red-300"
              : "bg-green-500/20 text-green-300"
          }`}
        >
          {!week.unlockDate
            ? "🔒 Locked · sin fecha"
            : isLocked
              ? `⏰ Scheduled · ${formatMonterrey(new Date(week.unlockDate))}`
              : `🔓 Open · desde ${formatMonterrey(new Date(week.unlockDate))}`}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm text-neutral-300">
          Desbloqueo (hora Monterrey):
        </span>
        <input
          type="datetime-local"
          value={unlockInput}
          onChange={(e) => setUnlockInput(e.target.value)}
          className="rounded border border-neutral-600 bg-neutral-800 px-3 py-2 text-white"
        />
        <button
          onClick={handleSchedule}
          className="rounded border border-neutral-600 bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700"
        >
          Programar
        </button>
        {week.unlockDate && (
          <button
            onClick={handleClearSchedule}
            className="rounded border border-neutral-600 bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700"
          >
            Quitar fecha
          </button>
        )}
      </div>

      {/* Detail Resources Management Section */}
      <div className="my-6 rounded-lg bg-primary-light p-4">
        <div className="mb-4 flex items-center gap-2">
          <Subtitle label="Detail Resources" className="text-sm" />
          <button onClick={() => {setShowResources(!showResources)} }>
          {showResources ?
            <BsArrowsCollapse className="fill-neutral-400 hover:fill-accent" /> :
            <BsArrowsExpand className="fill-neutral-400 hover:fill-accent" /> }
          </button>
        </div>
        <div className={showResources ? "" : "hidden"}>
        {/* Add new resource */}
        <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-3">
          <input
            type="text"
            placeholder="Resource title"
            value={newResourceTitle}
            onChange={(e) => setNewResourceTitle(e.target.value)}
            className="rounded border border-neutral-600 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-400"
          />
          <input
            type="url"
            placeholder="Resource URL"
            value={newResourceUrl}
            onChange={(e) => setNewResourceUrl(e.target.value)}
            className="rounded border border-neutral-600 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-400"
          />
          <button
            onClick={handleAddResource}
            className="flex items-center justify-center gap-2 rounded border border-neutral-600 bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700"
          >
            <BsPlus /> Add Resource
          </button>
        </div>

        {/* Existing resources */}
        <div className="space-y-2">
          {weekWithResources?.detailResources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center gap-2 rounded border border-neutral-600 bg-neutral-800 p-3"
            >
              {editingResourceId === resource.id ? (
                <>
                  <input
                    type="text"
                    value={editResourceTitle}
                    onChange={(e) => setEditResourceTitle(e.target.value)}
                    className="flex-1 rounded border border-neutral-600 bg-neutral-700 px-2 py-1 text-white"
                  />
                  <input
                    type="url"
                    value={editResourceUrl}
                    onChange={(e) => setEditResourceUrl(e.target.value)}
                    className="flex-1 rounded border border-neutral-600 bg-neutral-700 px-2 py-1 text-white"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="rounded border border-neutral-600 bg-neutral-700 px-3 py-1 text-white hover:bg-neutral-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="rounded border border-neutral-600 bg-neutral-700 px-3 py-1 text-white hover:bg-neutral-600"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <div className="font-medium text-white">
                      {resource.title}
                    </div>
                    <div className="text-sm text-neutral-300">
                      <a className="hover:underline" href={resource.url}>
                      {resource.url}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditResource(resource.id)}
                    className="rounded border border-neutral-600 bg-neutral-700 px-3 py-1 text-white hover:bg-neutral-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteResource(resource.id)}
                    className="p-1"
                    title="Delete resource"
                  >
                    <BsTrash className="fill-neutral-400 hover:fill-accent" />
                  </button>
                </>
              )}
            </div>
          ))}
          {(!weekWithResources?.detailResources ||
            weekWithResources.detailResources.length === 0) && (
            <div className="py-4 text-center text-neutral-400">
              No detail resources added yet.
            </div>
          )}
        </div>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-white text-left font-semibold text-white">
            <th className="pb-2"> Problem </th>
            <th className="pb-2 text-center"> Level </th>
            <th className="pb-2 text-center"> Solved by </th>
            <th className="pb-2 text-center"> ⭐ </th>
            <th className="pb-2 text-center"> 😵 </th>
          </tr>
        </thead>
        <tbody>
          {problems.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-neutral-400">
                No problems added to this week yet. Click the &quot;+&quot;
                button to add problems.
              </td>
            </tr>
          ) : (
            problems.map((prob) => (
              <AdminViewRow
                key={prob.id}
                problem={prob}
                solvedBy={prob.solvedBy.length || 0}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewBlock;
