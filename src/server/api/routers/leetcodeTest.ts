import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const leetcodeTestRouter = createTRPCRouter({
    allSubmissions: publicProcedure
        .input(z.object({ username: z.string() }))
        .query(async ({ input }) => {
            return `All submissions for user: ${input.username}`;
        }),
});