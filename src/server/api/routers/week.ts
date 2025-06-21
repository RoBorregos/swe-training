import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure
} from "~/server/api/trpc";

export const weekRouter = createTRPCRouter({
    getWeeks: protectedProcedure
    .query(async({ctx}) => {
        return ctx.db.week.findMany();
    }),

    getWeek: protectedProcedure
    .input(z.number())
    .query(async({ctx, input}) => {
        return ctx.db.week.findFirst({
            where: {
                number: input
            },
            include: { problems: {include: { solvedBy: true }}},   
        })
    })

})