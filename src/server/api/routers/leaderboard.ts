import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

// Map problem levels to leaderboard columns
const levelMap = {
  warmup: "warmup",
  littleHarder: "littleHarder",
  harder: "harder",
  insane: "insane",
};
export const leaderboardRouter = createTRPCRouter({
    // Full leaderboard
    getAll: publicProcedure.query(async ({ ctx }) => {
        // Fetch users -> solved problems
        const users = await ctx.db.user.findMany({
            select: {
                id: true,
                name: true,
                solvedProblems: {
                    select: {
                        level: true,
                        weekId: true,
                    },
                },
            },
        });
        // Aggregate leaderboard data from database
        return users.map((user) => {
            const counts = {
                warmup: 0,
                littleHarder: 0,
                harder: 0,
                insane: 0,
            };
            user.solvedProblems.forEach((p) => {
                // key for level - if not found, default to warmup
                const key =
                    levelMap[p.level.toLowerCase() as keyof typeof levelMap] || "warmup";
                // Increment the count for the corresponding level
                if (counts[key] !== undefined) counts[key]++;
            });
            return {
                username: user.name,
                completedWarmup: counts.warmup,
                completedLittleHarder: counts.littleHarder,
                completedHarder: counts.harder,
                completedInsane: counts.insane,
                total:
                    counts.warmup +
                    counts.littleHarder +
                    counts.harder +
                    counts.insane,
            };
        });
    }),
    // Get leaderboard for a specific week
    getByWeek: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const users = await ctx.db.user.findMany({
            select: {
                id: true,
                name: true,
                solvedProblems: {
                    where: { weekId: input },
                    select: { level: true },
                },
            },
        });

        return users.map((user) => {
            const counts = {
                warmup: 0,
                littleHarder: 0,
                harder: 0,
                insane: 0,
            };
            user.solvedProblems.forEach((p) => {
                const key =
                    levelMap[p.level.toLowerCase() as keyof typeof levelMap] || "warmup";
                if (counts[key] !== undefined) counts[key]++;
            });
            return {
                username: user.name,
                completedWarmup: counts.warmup,
                completedLittleHarder: counts.littleHarder,
                completedHarder: counts.harder,
                completedInsane: counts.insane,
                total:
                    counts.warmup +
                    counts.littleHarder +
                    counts.harder +
                    counts.insane,
            };
        });
    }),
});