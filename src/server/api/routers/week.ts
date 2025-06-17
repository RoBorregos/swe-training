import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const weekRouter = createTRPCRouter({
  getWeeks: protectedProcedure.query(async ({ ctx }) => {
    const weeks = await ctx.db.week.findMany();
    return weeks;
  }),

  getWeek: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const week = await ctx.db.week.findMany({
        where: {
          number: input,
        },
        include: { problems: { include: { solvedBy: true } } },
        // for cockroachdb
        take: 1,
      });
      return week;
    }),
});
