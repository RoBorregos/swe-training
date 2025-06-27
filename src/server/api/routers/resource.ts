import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const resourcesRouter = createTRPCRouter({
    getAdditionalContent: publicProcedure
    .input(z.object({ topic: z.string() }))
    .query(async ({ ctx, input }) => {
        return await ctx.db.additionalContent.findMany({
        where: { topic: input.topic },
        orderBy: { createdAt: "asc" },
        include: {
            author: {
            select: {
                id: true,
                name: true,
            },
            },
        },
        });
    }),


    addContent: protectedProcedure
    .input(z.object({
        topic: z.string(),
        content: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
        if (ctx.session.user.role.toLowerCase() !== "admin") {
        throw new Error("Unauthorized");
        }

        await ctx.db.additionalContent.create({
        data: {
            topic: input.topic,
            content: input.content,
            authorId: ctx.session.user.id,
        },
        });
    }),

    editContent: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const entry = await ctx.db.additionalContent.findUnique({
        where: { id: input.id },
        });

        if (entry?.authorId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
        }

        await ctx.db.additionalContent.update({
        where: { id: input.id },
        data: { content: input.content },
        });
    }),

    deleteContent: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const entry = await ctx.db.additionalContent.findUnique({
        where: { id: input.id },
        });

        if (entry?.authorId !== ctx.session.user.id) {
        throw new Error("Unauthorized");
        }

        await ctx.db.additionalContent.delete({
        where: { id: input.id },
        });
    }),

});
