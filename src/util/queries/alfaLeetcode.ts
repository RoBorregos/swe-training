import {z} from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import type { last20SubmissionsSchema } from "~/util/schemas/schemaAlfaLeetcode";

const leetEndpoint = "https://alfa-leetcode-api.onrender.com";

