import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const resourcesRouter = createTRPCRouter({
    getAdditionalContent: publicProcedure
        .input(z.object({ topic: z.string() }))
        .query(async ({ ctx, input }) => {
            const content = await ctx.db.additionalContent.findFirst({
                where: {
                    topic: input.topic
                },
                select: {
                    content: true
                }
            });
            return content?.content;
        }),

    addContent: protectedProcedure
        .input(z.object({
            topic: z.string(),
            content: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.session.user.role.toLowerCase() !== "admin") {
                throw new Error("Unauthorized");
            }

            await ctx.db.additionalContent.upsert({
                where: { topic: input.topic },
                update: { content: input.content },
                create: {
                    topic: input.topic,
                    content: input.content
                }
            });
        })
});