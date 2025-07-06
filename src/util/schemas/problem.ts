import { z } from "zod";

export const difficultyEnum = z.enum(["WARMUP", "MEDIUM", "HARDER", "INSANE"]);

export type DifficultyType = z.infer<typeof difficultyEnum>;
