import { leetcodeRouter } from "~/server/api/routers/leetcode";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { weekRouter } from "./routers/week";
import { problemRouter } from "./routers/problem";
import { leaderboardRouter } from "./routers/leaderboard";
import { resourcesRouter } from "./routers/resource";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  leetcode: leetcodeRouter,
  week: weekRouter,
  problem : problemRouter,
  leaderboard: leaderboardRouter,
  resource: resourcesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
