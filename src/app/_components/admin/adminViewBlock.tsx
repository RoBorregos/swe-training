"use client";
import { api } from "~/trpc/react";
import {
  BsEyeFill,
  BsEyeSlashFill,
  BsCartPlusFill,
  BsPencilSquare,
} from "react-icons/bs";
import Subtitle from "~/app/_components/subtitle";
import AdminViewRow from "~/app/_components/admin/adminViewRow";
import type { Prisma, Week } from "@prisma/client";

type ProblemWithSolvedBy = Prisma.ProblemGetPayload<{
  include: { solvedBy: true };
}>;

interface AdminViewBlockProps {
  week: Week;
  problems: ProblemWithSolvedBy[];
}

const AdminViewBlock = ({ week, problems }: AdminViewBlockProps) => {
  const utils = api.useUtils();
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

  const setWeekStatus = api.week.setWeekHidden.useMutation({
    onSuccess: async () => {
      await utils.week.invalidate();
    },
    onError: () => {
      alert(`Error: Could not change visibility.`);
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

  const handleSetWeekStatus = () => {
    setWeekStatus.mutate({ id: week.id, isBlocked: !week.isBlocked });
  };

  const newSlugIn = () => {
    const ns = prompt("Leetcode title slug:");
    if (!ns) {
      return;
    }
    createFromSlug.mutate({ slug: ns, weekId: week.id });
  };

  problems = problems.filter((p) => p.weekId == week.id);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button title="Toggle view" onClick={handleSetWeekStatus}>
          {week.isBlocked ? (
            <BsEyeSlashFill className="fill-neutral-400 hover:fill-accent" />
          ) : (
            <BsEyeFill className="fill-neutral-400 hover:fill-accent" />
          )}
        </button>
        <button title="Buy more problems" onClick={newSlugIn}>
          <BsCartPlusFill className="fill-neutral-400 hover:fill-accent" />
        </button>
        <button title="Change week title" onClick={handleWeekTitleChange}>
          <BsPencilSquare className="fill-neutral-400 hover:fill-accent" />
        </button>
        <Subtitle label={week.title} />
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
              <td colSpan={5} className="py-8 text-center text-gray-400">
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
