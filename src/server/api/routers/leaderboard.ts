import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

// Map problem levels to leaderboard columns
const levelMap = {
  warmup: "warmup",
  medium: "medium",
  harder: "harder",
  insane: "insane",
} as const;
export const leaderboardRouter = createTRPCRouter({
    // Full leaderboard
    getAll: publicProcedure.query(async ({ ctx }) => {
        // Fetch users -> solved problems
        const users = await ctx.db.user.findMany({
            select: {
                id: true,
                name: true,
                isReviewer: true,
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
                medium: 0,
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
                userId: user.id,
                username: user.name,
                isReviewer: user.isReviewer,
                completedWarmup: counts.warmup,
                completedMedium: counts.medium,
                completedHarder: counts.harder,
                completedInsane: counts.insane,
                total:
                    counts.warmup +
                    counts.medium +
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
                medium: 0,
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
                completedMedium: counts.medium,
                completedHarder: counts.harder,
                completedInsane: counts.insane,
                total:
                    counts.warmup +
                    counts.medium +
                    counts.harder +
                    counts.insane,
            };
        });
    }),

    clearUserProgress: adminProcedure
        .input(z.object({ userId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.user.update({
                where: { id: input.userId },
                data: { solvedProblems: { set: [] } },
            });
        }),

    getArchivedEditions: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.leaderboardSnapshot.findMany({
            select: { id: true, edition: true, createdAt: true },
            orderBy: { createdAt: "desc" },
        });
    }),

    getArchivedLeaderboard: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const snapshot = await ctx.db.leaderboardSnapshot.findUnique({
                where: { id: input.id },
            });
            return (snapshot?.entries as SnapshotEntry[] | undefined) ?? [];
        }),

    archiveAndReset: adminProcedure
        .input(z.object({ edition: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            const users = await ctx.db.user.findMany({
                select: {
                    name: true,
                    solvedProblems: { select: { level: true } },
                },
            });

            const computed = users.map((user) => {
                const counts = { warmup: 0, medium: 0, harder: 0, insane: 0 };
                user.solvedProblems.forEach((p) => {
                    const key =
                        levelMap[p.level.toLowerCase() as keyof typeof levelMap] ||
                        "warmup";
                    if (counts[key] !== undefined) counts[key]++;
                });
                return {
                    username: user.name,
                    completedWarmup: counts.warmup,
                    completedMedium: counts.medium,
                    completedHarder: counts.harder,
                    completedInsane: counts.insane,
                    total: counts.warmup + counts.medium + counts.harder + counts.insane,
                };
            });

            computed.sort((a, b) => b.total - a.total);

            let lastTotal: number | null = null;
            let lastPlace = 0;
            const entries: SnapshotEntry[] = computed.map((row, i) => {
                if (row.total !== lastTotal) {
                    lastPlace = i + 1;
                    lastTotal = row.total;
                }
                return { ...row, place: lastPlace };
            });

            const admins = await ctx.db.user.findMany({
                where: { role: "ADMIN" },
                select: { id: true },
            });

            const [snapshot] = await ctx.db.$transaction([
                ctx.db.leaderboardSnapshot.create({
                    data: {
                        edition: input.edition,
                        entries: entries as unknown as Prisma.InputJsonValue,
                    },
                }),
                ctx.db.user.deleteMany({ where: { role: { not: "ADMIN" } } }),
                ...admins.map((admin) =>
                    ctx.db.user.update({
                        where: { id: admin.id },
                        data: { solvedProblems: { set: [] } },
                    }),
                ),
            ]);

            return snapshot;
        }),
});

type SnapshotEntry = {
    username: string | null;
    completedWarmup: number;
    completedMedium: number;
    completedHarder: number;
    completedInsane: number;
    total: number;
    place: number;
};