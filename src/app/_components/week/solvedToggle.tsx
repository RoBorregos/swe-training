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
    // This is an option in case leetcode user doesnt work
    // For now we'll pass
    
    // toggleSolved.mutate({ problemId, userId });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={toggleSolved.status === 'pending'}
      className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors ${
        isSolved
          ? 'bg-green-500/60 text-green-100 border-green-400/50 hover:bg-green-500/80'
          : 'bg-gray-500/60 text-gray-200 border-gray-400/50 hover:bg-gray-500/80'
      } ${toggleSolved.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {toggleSolved.isPending ? 'Loading...' : isSolved ? 'Solved' : 'Unsolved'}
    </button>
  );
};

export default SolvedToggle;