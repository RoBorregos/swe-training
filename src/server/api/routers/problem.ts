import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
// import { Prisma } from "@prisma/client";

const difficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);

export const problemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.problem.findMany({ include: { week: true, solvedBy: true } });
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.problem.findUnique({
      where: { id: input },
      include: { week: true, solvedBy: true },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        level: difficultyEnum, 
        leetcodeUrl: z.string().url(),
        weekId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.problem.create({ data: input });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        level: difficultyEnum.optional(), 
        leetcodeUrl: z.string().url().optional(),
        weekId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.problem.update({ where: { id }, data });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.problem.delete({ where: { id: input } });
    }),
});
