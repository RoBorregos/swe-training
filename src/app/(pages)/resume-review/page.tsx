"use client";
import { useSession } from "next-auth/react";
import Title from "~/app/_components/title";
import MyResume from "~/app/_components/resume/MyResume";
import ReviewPanel from "~/app/_components/resume/ReviewPanel";

const ResumeReview = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-primary-foreground">Loading...</p>;
  }

  if (!session?.user) {
    return (
      <p className="text-primary-foreground">
        You must sign in to use the Resume Review.
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
          On this page you can upload your resume (CV) as a PDF to get feedback.
          The program&apos;s <strong>reviewers</strong> read it and leave you{" "}
          <strong>comments</strong> that you can see right here.
        </p>
        <ul className="mt-3 list-disc pl-6">
          <li>Upload your resume as a PDF (you can replace or delete it anytime).</li>
          <li>When a reviewer comments on it, you&apos;ll see the comment count in the navigation bar.</li>
          {canReview && (
            <li>
              As a reviewer, below you&apos;ll find the resumes to review and you
              can leave your comments.
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
