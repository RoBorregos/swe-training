import { z } from "zod";
import { Difficulty } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "../trpc";
import { getProblemIdBySlug } from "~/util/queries/graphqlLeetcode";
import { difficultyEnum } from "~/util/schemas/problem";

// import { Prisma } from "@prisma/client";

function stringToEnum(inp: string) {
  if (inp == "easy") return Difficulty.WARMUP;
  if (inp == "medium") return Difficulty.MEDIUM;
  if (inp == "hard") return Difficulty.HARDER;
  return Difficulty.MEDIUM;
}

export const problemRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.problem.findMany({
      include: { week: true, solvedBy: true },
    });
  }),
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.problem.findUnique({
      where: { id: input },
      include: { week: true, solvedBy: true },
    });
  }),
  createFromSlug: adminProcedure
    .input(z.object({ slug: z.string(), weekId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Extract slug from URL if a full LeetCode URL is provided
      let slug = input.slug;

      // Check if input is a full LeetCode URL
      if (slug.includes("leetcode.com/problems/")) {
        const regex = /leetcode\.com\/problems\/([^\/\?]+)/;
        const match = regex.exec(slug);
        if (match?.[1]) {
          slug = match[1];
        }
      }

      const problem = await getProblemIdBySlug({ slug: slug });
      if (problem) {
        const data = {
          name: problem.title,
          level: stringToEnum(problem.difficulty),
          leetcodeUrl: `https://leetcode.com/problems/${problem.titleSlug}`,
          weekId: input.weekId,
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
        recommended: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.problem.update({ where: { id }, data });
    }),

  delete: adminProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return await ctx.db.problem.delete({ where: { id: input } });
  }),

  toggleSolved: protectedProcedure
    .input(z.object({ problemId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { problemId, userId } = input;

      // Check if the problem is already solved by the user
      const problem = await ctx.db.problem.findUnique({
        where: { id: problemId },
        include: { solvedBy: true },
      });

      if (!problem) {
        throw new Error("Problem not found");
      }

      const alreadySolved = problem.solvedBy.some((user) => user.id === userId);

      if (alreadySolved) {
        return await ctx.db.problem.update({
          where: { id: problemId },
          data: {
            solvedBy: {
              disconnect: { id: userId },
            },
          },
        });
      } else {
        return await ctx.db.problem.update({
          where: { id: problemId },
          data: {
            solvedBy: {
              connect: { id: userId },
            },
          },
        });
      }
    }),
});
