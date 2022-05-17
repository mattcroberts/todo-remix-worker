import { forwardRef } from "react";
import type { ITodo } from "../types";
import styles from "./styles.css";

export const links = () => [{ rel: "stylesheet", href: styles }];

const Todo = forwardRef<HTMLFormElement, Partial<ITodo>>(
  ({ id, description, completed }, ref) => (
    <form className="todo" ref={ref} action="save-todo" method="POST">
      <input name="id" type="hidden" value={id || undefined} />
      <textarea
        placeholder="Enter todo text..."
        name="description"
        defaultValue={description}
        onBlur={(e) => {
          e.target.form?.submit();
        }}
      />
      {id && (
        <input
          name="completed"
          type="checkbox"
          defaultChecked={completed}
          onChange={(e) => {
            e.target.form?.submit();
          }}
        />
      )}
    </form>
  )
);

Todo.displayName = "Todo";

export default Todo;
