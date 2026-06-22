import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UTApi } from "uploadthing/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
  resumeUploader: f({ pdf: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await auth();
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { userId } = metadata;

      const existing = await db.resumeSubmission.findUnique({
        where: { userId },
      });
      if (existing && existing.fileKey !== file.key) {
        await utapi.deleteFiles(existing.fileKey).catch(() => undefined);
      }

      await db.resumeSubmission.upsert({
        where: { userId },
        create: {
          userId,
          fileUrl: file.ufsUrl,
          fileKey: file.key,
          fileName: file.name,
        },
        update: {
          fileUrl: file.ufsUrl,
          fileKey: file.key,
          fileName: file.name,
        },
      });

      return { uploadedBy: userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
