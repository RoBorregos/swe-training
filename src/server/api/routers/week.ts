import { z } from "zod";
import { Difficulty } from "@prisma/client";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const weekRouter = createTRPCRouter({
  getWeeks: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.week.findMany({
      orderBy: { number: "asc" },
      include: {
        problems: {
          include: {
            solvedBy: {
              select: {
                id: true,
                name: true,
                leetcodeUser: true,
              },
            },
          },
        },
      },
    });
  }),

  getWeek: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return await ctx.db.week.findFirst({
        where: { number: input },
        include: {
          problems: {
            include: {
              solvedBy: {
                select: {
                  id: true,
                  name: true,
                  leetcodeUser: true,
                },
              },
            },
            orderBy: {
              level: "asc",
            },
          },
        },
      });
    }),

  createWeek: protectedProcedure
    .input(
      z.object({
        number: z.number().min(1),
        title: z.string().min(3),
        description: z.string().min(10),
        color: z.string().min(4),
        isBlocked: z.boolean().default(false),
        resources: z.array(z.string().url()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      return await ctx.db.week.create({
        data: {
          number: input.number,
          title: input.title,
          description: input.description,
          color: input.color,
          isBlocked: input.isBlocked,
          resources: input.resources || [],
        },
      });
    }),

  updateWeek: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        number: z.number().min(1).optional(),
        title: z.string().min(3).optional(),
        description: z.string().min(10).optional(),
        color: z.string().min(4).optional(),
        isBlocked: z.boolean().optional(),
        resources: z.array(z.string().url()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      const { id, ...data } = input;
      return await ctx.db.week.update({
        where: { id },
        data,
      });
    }),

  deleteWeek: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      return await ctx.db.week.delete({
        where: { id: input.id },
      });
    }),

  addProblem: protectedProcedure
    .input(
      z.object({
        weekId: z.string(),
        name: z.string().min(3),
        level: z.nativeEnum(Difficulty),
        leetcodeUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      return await ctx.db.problem.create({
        data: {
          name: input.name,
          level: input.level,
          leetcodeUrl: input.leetcodeUrl,
          weekId: input.weekId,
        },
      });
    }),

  removeProblem: protectedProcedure
    .input(z.object({ problemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
      }

      return await ctx.db.problem.delete({
        where: { id: input.problemId },
      });
    }),
});