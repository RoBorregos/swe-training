"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

interface SolvedToggleProps {
  problemId: string;
  initialSolved: boolean;
  userId: string;
}

const SolvedToggle = ({ problemId, initialSolved, userId }: SolvedToggleProps) => {
  const [isSolved, setIsSolved] = useState(initialSolved);
  
  const toggleSolved = api.problem.toggleSolved.useMutation({
    onSuccess: () => {
      setIsSolved(!isSolved);
    },
  });

  const handleToggle = () => {
    toggleSolved.mutate({ problemId, userId });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={toggleSolved.status === 'pending'}
      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        isSolved
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-gray-600 text-gray-200 hover:bg-gray-700'
      } ${toggleSolved.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {toggleSolved.isPending ? 'Loading...' : isSolved ? 'Solved' : 'Unsolved'}
    </button>
  );
};

export default SolvedToggle;