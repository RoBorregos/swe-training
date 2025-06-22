'use client';

import { useSession } from "next-auth/react";
import React from "react";

type AdminOnlyProps = {
  topic?: string;
  value: string;
  onChangeAction: (value: string) => void;
  onSubmitAction: () => void;
};

export const AdminOnly = ({ topic, value, onChangeAction, onSubmitAction }: AdminOnlyProps) => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role?.toLowerCase() === "admin";

  if (!isAdmin) return null;

    return (
    <div className="mt-6 bg-gray-800 p-3 rounded-lg border border-gray-600">
        <h3 className="text-base font-semibold text-green-300 mb-2">
        Add Info {topic && `(${topic})`}
        </h3>
        <textarea
        className="w-full p-2 rounded bg-gray-100 text-sm text-black focus:outline-none"
        rows={3}
        placeholder="Add content..."
        value={value}
        onChange={(e) => onChangeAction(e.target.value)}
        />
        <button
        onClick={onSubmitAction}
        className="mt-2 px-3 py-1.5 bg-green-500 text-black text-sm font-medium rounded hover:bg-green-400"
        >
        Save
        </button>
    </div>
    );

};
