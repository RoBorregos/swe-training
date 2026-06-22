"use client";
import { useSession } from "next-auth/react";
import Title from "~/app/_components/title";
import MyResume from "~/app/_components/resume/MyResume";
import ReviewPanel from "~/app/_components/resume/ReviewPanel";

const ResumeReview = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-primary-foreground">Cargando...</p>;
  }

  if (!session?.user) {
    return (
      <p className="text-primary-foreground">
        Debes iniciar sesión para usar el Resume Review.
      </p>
    );
  }

  const canReview =
    session.user.role === "ADMIN" || session.user.isReviewer === true;

  return (
    <div className="flex flex-col gap-10">
      <Title label="Resume Review" />

      <div className="rounded-2xl bg-primary-light p-6 text-primary-foreground">
        <p>
          En esta página puedes subir tu currículum (CV) en PDF para recibir
          retroalimentación. Los <strong>reviewers</strong> del programa lo
          revisan y te dejan <strong>comentarios</strong> que podrás ver aquí
          mismo.
        </p>
        <ul className="mt-3 list-disc pl-6">
          <li>Sube tu resume en PDF (puedes reemplazarlo o borrarlo cuando quieras).</li>
          <li>Cuando un reviewer lo comente, verás el número de comentarios en la barra de navegación.</li>
          {canReview && (
            <li>
              Como reviewer, abajo encontrarás los resumes por revisar y podrás
              dejar tus comentarios.
            </li>
          )}
        </ul>
      </div>

      <MyResume />
      {canReview && <ReviewPanel />}
    </div>
  );
};

export default ResumeReview;
