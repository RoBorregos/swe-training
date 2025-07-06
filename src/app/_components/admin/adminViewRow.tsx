"use client";

import { api } from "~/trpc/react";
import { BsFillTrashFill } from "react-icons/bs";
import { IoIosStar } from "react-icons/io";
import type { Problem } from "@prisma/client";
import { difficultyEnum, type DifficultyType } from "~/util/schemas/problem";
import { getLevelStyles } from "~/util/styles/difficulty";
import { cn } from "utils/merge";

interface AdminViewRowProps {
  problem: Problem;
  solvedBy: number;
}

const AdminViewRow = ({ problem, solvedBy }: AdminViewRowProps) => {
  const utils = api.useUtils();

  const deleteMutation = api.problem.delete.useMutation({
    onSuccess: async () => {
      /*remove element from page*/
      await utils.problem.invalidate();
    },
    onError: () => {
      alert("Error: Could not delete problem.");
    },
  });

  const updateMutation = api.problem.update.useMutation({
    onSuccess: async () => {
      /*refresh the data*/
      await utils.problem.invalidate();
    },
    onError: () => {
      alert("Error: Could not update problem state.");
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(problem.id);
  };

  const handleDifficultyChange = (newDifficulty: DifficultyType) => {
    updateMutation.mutate({
      id: problem.id,
      level: newDifficulty,
    });
  };

  const handleRecommendedToggle = () => {
    updateMutation.mutate({
      id: problem.id,
      recommended: !problem.recommended,
    });
  };

  return (
    <tr className="cursor-pointer text-white transition duration-300 hover:scale-[1.01] hover:bg-gray-800/50">
      <td className="py-2">
        <a
          href={problem.leetcodeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          <div className="flex flex-row items-center gap-2">
            {problem.recommended && <IoIosStar className="fill-yellow-400" />}
            {problem.name}
          </div>
        </a>
      </td>
      <td className="py-2 text-center">
        <span
          className={cn(
            "rounded-full border px-2 py-1 text-xs font-medium",
            getLevelStyles(problem.level),
          )}
        >
          {problem.level.charAt(0).toUpperCase() +
            problem.level.slice(1).toLowerCase()}
        </span>
        <select
          value={problem.level}
          onChange={(e) =>
            handleDifficultyChange(e.target.value as DifficultyType)
          }
          className="ml-2 rounded border border-neutral-600 bg-neutral-800 px-2 py-1 text-xs text-white"
          disabled={updateMutation.isPending}
        >
          {difficultyEnum.options.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </td>
      <td className="py-2 text-center">{solvedBy}</td>
      <td className="py-2 text-center align-middle">
        <button
          title={
            problem.recommended
              ? "Remove recommendation"
              : "Mark as recommended"
          }
          onClick={handleRecommendedToggle}
          disabled={updateMutation.isPending}
          className="p-1"
        >
          <IoIosStar
            className={
              problem.recommended
                ? "fill-yellow-400 hover:fill-yellow-300"
                : "fill-gray-400 hover:fill-gray-300"
            }
            size={20}
          />
        </button>
      </td>
      <td className="py-2 text-center align-middle">
        <button title="Remove from set" onClick={handleDelete}>
          <BsFillTrashFill className="fill-neutral-400 hover:fill-accent" />
        </button>
      </td>
    </tr>
  );
};

export default AdminViewRow;
