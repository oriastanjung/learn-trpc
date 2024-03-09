"use client";
import { trpc } from "@/app/_trpc/client";
import { FormEvent, useState } from "react";

export default function TodoList() {
  const [todo, setTodo] = useState<string>("");
  const getTodos = trpc.getTodos.useQuery();
  const getOneTodo = trpc.getOneTodo.useQuery("sakldkla");
  const addTodo = trpc.createTodo.useMutation();

  //   console.log(getOneTodo.data);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createTodo = addTodo.mutate({ name: todo });
    await getTodos.refetch()
    console.log("createTodo >> ", createTodo);
  };
  return (
    <div>
      <div>{JSON.stringify(getTodos.data)}</div>
      <div className="mt-40">One{JSON.stringify(getOneTodo.data)}</div>
      <form
        className="flex flex-col mt-40 items-center justify-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">input Todo</label>
        <input
          className="text-black"
          required
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
