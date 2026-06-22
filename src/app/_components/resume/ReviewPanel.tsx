"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import Subtitle from "~/app/_components/subtitle";

const ReviewPanel = () => {
  const utils = api.useUtils();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const { data: list } = api.resume.listForReview.useQuery();
  const { data: selected } = api.resume.getForReview.useQuery(
    { id: selectedId ?? "" },
    { enabled: !!selectedId },
  );

  const addComment = api.resume.addComment.useMutation({
    onSuccess: async () => {
      setComment("");
      await utils.resume.getForReview.invalidate({ id: selectedId ?? "" });
      await utils.resume.listForReview.invalidate();
    },
    onError: () => alert("Could not add the comment."),
  });

  return (
    <div className="rounded-2xl bg-primary-light p-6">
      <Subtitle label="Resumes to review" />

      <div className="mt-4 flex flex-col gap-6 lg:flex-row">
        <ul className="flex w-full flex-col gap-2 lg:w-1/3">
          {!list || list.length === 0 ? (
            <li className="text-sm text-neutral-400">
              No resumes uploaded yet.
            </li>
          ) : (
            list.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() =>
                    setSelectedId((prev) => (prev === r.id ? null : r.id))
                  }
                  className={`flex w-full items-center justify-between gap-2 rounded-lg border p-3 text-left transition ${
                    selectedId === r.id
                      ? "border-accent bg-neutral-800"
                      : "border-neutral-700 bg-neutral-800/50 hover:bg-neutral-800"
                  }`}
                >
                  <span className="truncate text-sm text-white">
                    {r.userName ?? "User"}
                  </span>
                  {r.pending ? (
                    <span className="shrink-0 rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-300">
                      Pending
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-300">
                      {r.commentCount} 💬
                    </span>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="w-full lg:w-2/3">
          {selected ? (
            <div className="flex flex-col gap-4">
              <a
                href={selected.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end text-sm text-accent underline"
              >
                Open in new tab ↗
              </a>
              <iframe
                src={`${selected.fileUrl}#view=FitH`}
                className="h-[85vh] w-full rounded-lg border border-neutral-700 bg-white"
                title={`Resume of ${selected.user.name ?? ""}`}
              />

              <div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  Comments ({selected.comments.length})
                </h3>
                <ul className="flex flex-col gap-3">
                  {selected.comments.map((c) => (
                    <li
                      key={c.id}
                      className="rounded-lg border border-neutral-700 bg-neutral-800 p-3"
                    >
                      <div className="text-sm font-semibold text-accent">
                        {c.author.name ?? "Reviewer"}
                      </div>
                      <div className="whitespace-pre-wrap text-sm text-white">
                        {c.content}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-col gap-2">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    placeholder="Write your comment..."
                    className="w-full rounded-lg border border-neutral-600 bg-neutral-800 px-3 py-2 text-white placeholder-neutral-400"
                  />
                  <button
                    onClick={() =>
                      addComment.mutate({
                        resumeId: selected.id,
                        content: comment.trim(),
                      })
                    }
                    disabled={!comment.trim() || addComment.isPending}
                    className="self-end rounded-lg bg-accent px-4 py-2 font-semibold text-white transition hover:bg-accent-dark disabled:opacity-50"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-primary-foreground">
              Select a resume from the list to review it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPanel;
