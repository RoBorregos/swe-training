import {z} from "zod";

export const last20SubmissionsSchema = z.object({
    username: z.string(),
    title: z.string(),
    timestamp: z.number(),
});