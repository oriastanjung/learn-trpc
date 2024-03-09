import { publicProcedure, router } from "./trpc";
import prisma from "../../lib/prisma";
import { z } from "zod";

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    const data = await prisma.todo.findMany();
    // console.log("data >> ", data)
    return data;
  }),
  getOneTodo: publicProcedure.input(z.string()).query(async (opts) => {
    const { input: id } = opts;
    const data = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });

    return data;
  }),

  createTodo: publicProcedure
    .input(z.object({ name: z.string().nonempty() }))
    .mutation(async (input) => {
      const {name} = input.input
      const createdData = await prisma.todo.create({
        data : {
          name
        }
      })

      return createdData
    }),
});

export type AppRouter = typeof appRouter;
