import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const weekRouter = createTRPCRouter({
  getWeeks: protectedProcedure.query(async ({ ctx }) => {
    const weeks = await ctx.db.week.findMany();
    return weeks;
  }),

  getWeekPublic: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.week.findFirst({
        where: {
          id: input.id,
          isBlocked: false,
        },
        include: {
          detailResources: true,
          problems: {
            include: {
              solvedBy: { select: { id: true, name: true } },
            },
          },
        },
      });
    }),

  getWeeksPublic: publicProcedure.query(async ({ ctx }) => {
    const week = await ctx.db.week.findMany({});
    return week;
  }),

  getWeeksNotLocked: publicProcedure.query(async ({ ctx }) => {
    const week = await ctx.db.week.findMany({
      where: {
        isBlocked: false,
      },
    });
    return week;
  }),

  setWeekHidden: adminProcedure
    .input(z.object({ id: z.string(), isBlocked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.week.update({ where: { id }, data });
    }),

  changeWeekTitle: adminProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.week.update({ where: { id }, data });
    }),

  addDetailResource: adminProcedure
    .input(
      z.object({
        weekId: z.string(),
        title: z.string(),
        url: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.resource.create({
        data: {
          title: input.title,
          url: input.url,
          weekId: input.weekId,
        },
      });
    }),

  updateDetailResource: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        url: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db.resource.update({
        where: { id },
        data,
      });
    }),

  deleteDetailResource: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.resource.delete({
        where: { id: input.id },
      });
    }),
});
