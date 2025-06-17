import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
// import { Prisma } from "@prisma/client";

export const profileRouter = createTRPCRouter({
    getById: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.user.findUnique({ where: { id: input }, include: { accounts: true, sessions: false, solvedProblems: true } });
    }),
    update: protectedProcedure
    .input(z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().url().optional(),
        image: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return await ctx.db.user.update({ where: { id }, data });
    }),
});