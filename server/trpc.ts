import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { createRoom } from '../serviceAPIs/gameSockets'

const t = initTRPC.create({ transformer: superjson });

export const appRouter = t.router({
  greeting: t.procedure
    .input(z.object({
      name: z.string(),
    }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}` };
    }),
  createRoom: t.procedure
  .input(z.object({
    userId: z.string(),
    playFriend: z.boolean(),
  }))
  .mutation(async ({input})=>{
    try{
    const data = await createRoom(input.userId, input.playFriend);
    const {roomId, w, b} = data;
    return { roomId, w, b };
    }
    catch(err){
      console.log('erroren');
      return { error: 'erroren' };
    }
    }),
});

export type AppRouter = typeof appRouter;
