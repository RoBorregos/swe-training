"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/trpc/react";

const AdminContributions = ({
  content,
}: {
  content: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string | null;
    };
  }[];
}) => {
  const { data: session } = useSession();
  const user = session?.user;
  const utils = api.useUtils();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const editMutation = api.resource.editContent.useMutation({
    onSuccess: async () => {
      await utils.resource.getAdditionalContent.invalidate();
      setEditingId(null);
    },
  });

  const deleteMutation = api.resource.deleteContent.useMutation({
    onSuccess: async () => await utils.resource.getAdditionalContent.invalidate(),
  });

  if (!content || content.length === 0) return null;

  return (
    <div className="mb-4 space-y-4">
      {content.map((item) => {
        const isAuthor = user?.id === item.author?.id;

        return (
          <div key={item.id}>
            <div className="flex items-center mb-2 mt-4">
              <h3 className="text-green-300 text-sm font-semibold">
                {item.author?.name ?? "User"}
              </h3>
            </div>

            {editingId === item.id ? (
              <>
                <textarea
                  className="w-full p-2 text-sm text-black rounded"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() =>
                      editMutation.mutate({ id: item.id, content: editValue })
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-black py-1 px-3 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="whitespace-pre-line text-sm text-white">
                  {item.content}
                </p>
                {isAuthor && (
                  <div className="flex gap-4 mt-2 text-sm">
                    <button
                      onClick={() => {
                        setEditValue(item.content);
                        setEditingId(item.id);
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={ () => void deleteMutation.mutate({ id: item.id })}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminContributions;