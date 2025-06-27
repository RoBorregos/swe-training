"use client";

import { api } from "~/trpc/react";
import { BsFillTrashFill } from "react-icons/bs";
import type { Problem } from "@prisma/client";

interface AdminViewRowProps {
    problem: Problem,
    solvedBy: number,
};

const AdminViewRow = ({problem, solvedBy}: AdminViewRowProps) => {
    
    const utils = api.useUtils();

    const deleteMutation = api.problem.delete.useMutation({
        onSuccess: async () => {
          /*remove element from page*/
          await utils.problem.invalidate();
        },
        onError: () => {
          alert('Error: Could not delete problem.');
        }
      });

    const handleDelete = () => {
        deleteMutation.mutate(problem.id);
    };

    return (
      <tr className="text-white">
      <td><a className="hover:underline" href={problem.leetcodeUrl}>{problem.name}</a></td>
      <td><p className="text-center">{problem.level}</p></td>
      <td><p className="text-center">{solvedBy}</p></td>
      <td className="text-center align-middle"><button title="Remove from set" onClick={handleDelete}>
        <BsFillTrashFill className="fill-neutral-400 hover:fill-accent"/>
      </button></td>
      </tr>
    )
}

export default AdminViewRow;
