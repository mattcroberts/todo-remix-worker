import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import Todo, { links as todoLinks } from "../components/todo";

import styles from "../styles/global.css";
import type { ITodo } from "../types";

export const links: LinksFunction = () => {
  return [...todoLinks(), { rel: "stylesheet", href: styles }];
};

export const loader: LoaderFunction = async () => {
  const { keys } = await TODOS.list();

  const todos = keys.map(async ({ name }) => {
    const id = name;
    const kvResult = await TODOS.getWithMetadata<{ completed: boolean }>(name);
    console.log(kvResult);
    return {
      id,
      description: kvResult.value,
      completed: kvResult.metadata?.completed,
    };
  });
  const result = await Promise.all(todos);
  result.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
  return json(result);
};

export default function Index() {
  const todos = useLoaderData<Array<ITodo>>();

  return (
    <div>
      <h1>Matt's Worker Todo List</h1>
      <ul className="todo-list">
        <li>
          <Todo />
        </li>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo {...todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
