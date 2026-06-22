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
    onError: () => alert("No se pudo borrar el resume."),
  });

  const handleDelete = () => {
    if (
      confirm(
        "¿Borrar tu resume? Dejará de aparecerles a los reviewers y se eliminarán sus comentarios.",
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
          onUploadError={(e) => alert(`Error al subir: ${e.message}`)}
        />
        {resume && (
          <>
            <span className="text-sm text-primary-foreground">
              Archivo actual: {resume.fileName}
            </span>
            <button
              onClick={handleDelete}
              disabled={deleteMine.isPending}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              Borrar resume
            </button>
          </>
        )}
      </div>

      {isLoading ? (
        <p className="mt-4 text-primary-foreground">Cargando...</p>
      ) : resume ? (
        <div className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="self-end text-sm text-accent underline"
            >
              Abrir en pestaña nueva ↗
            </a>
            <iframe
              src={`${resume.fileUrl}#view=FitH`}
              className="h-[85vh] w-full rounded-lg border border-neutral-700 bg-white"
              title="Mi resume"
            />
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">
              Comentarios ({resume.comments.length})
            </h3>
            {resume.comments.length === 0 ? (
              <p className="text-sm text-neutral-400">
                Aún no hay comentarios de reviewers.
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
          Sube tu resume en PDF para que los reviewers puedan darte
          retroalimentación.
        </p>
      )}
    </div>
  );
};

export default MyResume;
