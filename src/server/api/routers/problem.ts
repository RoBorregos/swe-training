import { z } from "zod";
import { Difficulty } from "@prisma/client"
import { createTRPCRouter, protectedProcedure, publicProcedure, adminProcedure } from "../trpc";
import { getProblemIdBySlug } from "~/util/queries/graphqlLeetcode";

// import { Prisma } from "@prisma/client";

const difficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);

function stringToEnum(inp: string) {
  if(inp == 'easy') return Difficulty.EASY;
  if(inp == 'medium') return Difficulty.MEDIUM;
  if(inp == 'hard') return Difficulty.HARD;
  return Difficulty.MEDIUM;
}


export const problemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.problem.findMany({
      include: { week: true, solvedBy: true }
    });
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.problem.findUnique({
      where: { id: input },
      include: { week: true, solvedBy: true },
    });
  }),
  createFromSlug: adminProcedure
    .input(z.object({slug: z.string(), weekId: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const problem = await getProblemIdBySlug({slug: input.slug});
    if(problem) {
      const data = {
        name: problem.title,
        level: stringToEnum(problem.difficulty),
        leetcodeUrl: `https://leetcode.com/problems/${problem.titleSlug}`,
        weekId: input.weekId
      };
      return await ctx.db.problem.create({ data });
    }
    }),
  update: adminProcedure
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

  delete: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.problem.delete({ where: { id: input } });
    }),
});
