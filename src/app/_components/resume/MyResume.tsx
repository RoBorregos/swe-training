"use client";
import { api } from "~/trpc/react";
import { UploadButton } from "~/util/uploadthing";
import Subtitle from "~/app/_components/subtitle";

const MyResume = () => {
  const utils = api.useUtils();
  const { data: resume, isLoading } = api.resume.getMine.useQuery();

  const deleteMine = api.resume.deleteMine.useMutation({
    onSuccess: async () => {
      await utils.resume.getMine.invalidate();
    },
    onError: () => alert("Could not delete the resume."),
  });

  const handleDelete = () => {
    if (
      confirm(
        "Delete your resume? It will no longer appear to reviewers and their comments will be removed.",
      )
    ) {
      deleteMine.mutate();
    }
  };

  return (
    <div className="rounded-2xl bg-primary-light p-6">
      <Subtitle label="My Resume" />

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <UploadButton
          endpoint="resumeUploader"
          onClientUploadComplete={async () => {
            await utils.resume.getMine.invalidate();
          }}
          onUploadError={(e) => alert(`Upload error: ${e.message}`)}
        />
        {resume && (
          <>
            <span className="text-sm text-primary-foreground">
              Current file: {resume.fileName}
            </span>
            <button
              onClick={handleDelete}
              disabled={deleteMine.isPending}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              Delete resume
            </button>
          </>
        )}
      </div>

      {isLoading ? (
        <p className="mt-4 text-primary-foreground">Loading...</p>
      ) : resume ? (
        <div className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-end text-sm text-accent underline"
            >
              Open in new tab ↗
            </a>
            <iframe
              src={`${resume.fileUrl}#view=FitH`}
              className="h-[85vh] w-full rounded-lg border border-neutral-700 bg-white"
              title="My resume"
            />
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Comments ({resume.comments.length})
            </h3>
            {resume.comments.length === 0 ? (
              <p className="text-sm text-neutral-400">
                No comments from reviewers yet.
              </p>
            ) : (
              <ul className="flex flex-col gap-3">
                {resume.comments.map((c) => (
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
            )}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-primary-foreground">
          Upload your resume as a PDF so reviewers can give you feedback.
        </p>
      )}
    </div>
  );
};

export default MyResume;
