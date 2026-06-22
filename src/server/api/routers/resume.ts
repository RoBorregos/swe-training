import { z } from "zod";
import { UTApi } from "uploadthing/server";
import {
  createTRPCRouter,
  protectedProcedure,
  reviewerProcedure,
  adminProcedure,
} from "../trpc";

const utapi = new UTApi();

export const resumeRouter = createTRPCRouter({
  getMine: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.resumeSubmission.findUnique({
      where: { userId: ctx.session.user.id },
      include: {
        comments: {
          orderBy: { createdAt: "asc" },
          include: { author: { select: { name: true } } },
        },
      },
    });
  }),

  deleteMine: protectedProcedure.mutation(async ({ ctx }) => {
    const existing = await ctx.db.resumeSubmission.findUnique({
      where: { userId: ctx.session.user.id },
    });
    if (!existing) return null;

    await utapi.deleteFiles(existing.fileKey).catch(() => undefined);

    return await ctx.db.resumeSubmission.delete({
      where: { userId: ctx.session.user.id },
    });
  }),

  listForReview: reviewerProcedure.query(async ({ ctx }) => {
    const submissions = await ctx.db.resumeSubmission.findMany({
      include: {
        user: { select: { name: true } },
        _count: { select: { comments: true } },
      },
      orderBy: { updatedAt: "desc" },
    });

    return submissions.map((s) => ({
      id: s.id,
      fileName: s.fileName,
      fileUrl: s.fileUrl,
      userName: s.user.name,
      commentCount: s._count.comments,
      pending: s._count.comments === 0,
      updatedAt: s.updatedAt,
    }));
  }),

  getForReview: reviewerProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.resumeSubmission.findUnique({
        where: { id: input.id },
        include: {
          user: { select: { name: true } },
          comments: {
            orderBy: { createdAt: "asc" },
            include: { author: { select: { name: true } } },
          },
        },
      });
    }),

  addComment: reviewerProcedure
    .input(z.object({ resumeId: z.string(), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.resumeComment.create({
        data: {
          resumeId: input.resumeId,
          authorId: ctx.session.user.id,
          content: input.content,
        },
      });
    }),

  setReviewer: adminProcedure
    .input(z.object({ userId: z.string(), isReviewer: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: input.userId },
        data: { isReviewer: input.isReviewer },
      });
    }),
});
