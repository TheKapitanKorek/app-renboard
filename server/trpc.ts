import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";

const t = initTRPC.create({ transformer: superjson });

export const appRouter = t.router({
  greeting: t.procedure
    .input(z.object({
      name: z.string(),
    }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}` };
    }),
});

export type AppRouter = typeof appRouter;
