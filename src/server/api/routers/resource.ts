import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const resourceRouter = createTRPCRouter({
  getContent: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.resourceContent.findFirst({ where: { topic: input } });
    }),

  setContent: protectedProcedure
    .input(z.object({ topic: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.resourceContent.upsert({
        where: { topic: input.topic },
        update: { content: input.content },
        create: { topic: input.topic, content: input.content },
      });
    }),
});