import { z } from "zod";
import { createTRPCRouter, publicProcedure, adminProcedure } from "../trpc";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export const presenterRouter = createTRPCRouter({
  getByWeek: publicProcedure
    .input(z.object({ weekId: z.string() }))
    .query(async ({ ctx, input }) => {
      const problems = await ctx.db.problem.findMany({
        where: { weekId: input.weekId, recommended: true },
        select: {
          id: true,
          name: true,
          level: true,
          leetcodeUrl: true,
          _count: { select: { solvedBy: true } },
          presenter: {
            select: {
              userId: true,
              user: { select: { name: true } },
            },
          },
        },
        // No orderBy: keep the same default order as the week's problem list
        // (see week.getWeekPublic) so presenters match the card ordering.
      });

      return problems.map((p) => ({
        problemId: p.id,
        name: p.name,
        level: p.level,
        leetcodeUrl: p.leetcodeUrl,
        eligibleCount: p._count.solvedBy,
        presenterId: p.presenter?.userId ?? null,
        presenterName: p.presenter?.user.name ?? null,
      }));
    }),

  drawWeek: adminProcedure
    .input(z.object({ weekId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const problems = await ctx.db.problem.findMany({
        where: { weekId: input.weekId, recommended: true },
        select: {
          id: true,
          solvedBy: { select: { id: true } },
        },
      });

      const ordered = problems
        .filter((p) => p.solvedBy.length > 0)
        .map((p) => ({ p, r: Math.random() }))
        .sort((a, b) => a.p.solvedBy.length - b.p.solvedBy.length || a.r - b.r)
        .map((x) => x.p);

      const used = new Set<string>();
      const assignments = new Map<string, string>(); // problemId -> userId
      for (const p of ordered) {
        const solverIds = p.solvedBy.map((u) => u.id);
        const fresh = solverIds.filter((id) => !used.has(id));
        const chosen = pickRandom(fresh.length > 0 ? fresh : solverIds);
        used.add(chosen);
        assignments.set(p.id, chosen);
      }

      await ctx.db.$transaction(
        problems.map((p) => {
          const chosen = assignments.get(p.id);
          if (chosen === undefined) {
            return ctx.db.problemPresenter.deleteMany({
              where: { problemId: p.id },
            });
          }
          return ctx.db.problemPresenter.upsert({
            where: { problemId: p.id },
            create: { problemId: p.id, userId: chosen },
            update: { userId: chosen, assignedAt: new Date() },
          });
        }),
      );

      return { ok: true };
    }),

  reroll: adminProcedure
    .input(z.object({ problemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const problem = await ctx.db.problem.findUnique({
        where: { id: input.problemId },
        select: {
          id: true,
          solvedBy: { select: { id: true } },
          presenter: { select: { userId: true } },
        },
      });

      if (!problem) throw new Error("Problem not found");

      const solverIds = problem.solvedBy.map((u) => u.id);
      if (solverIds.length === 0) {
        throw new Error("No one has solved this problem yet");
      }

      const currentId = problem.presenter?.userId ?? null;
      const candidates =
        solverIds.length > 1
          ? solverIds.filter((id) => id !== currentId)
          : solverIds;
      const chosen = pickRandom(candidates.length > 0 ? candidates : solverIds);

      await ctx.db.problemPresenter.upsert({
        where: { problemId: problem.id },
        create: { problemId: problem.id, userId: chosen },
        update: { userId: chosen, assignedAt: new Date() },
      });

      return { ok: true };
    }),

  clearWeek: adminProcedure
    .input(z.object({ weekId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.problemPresenter.deleteMany({
        where: { problem: { weekId: input.weekId } },
      });
      return { ok: true };
    }),
});
