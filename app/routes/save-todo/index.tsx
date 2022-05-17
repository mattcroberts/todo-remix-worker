import type { ActionFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import type { ITodo } from "../../types";

interface FormResponse {
  id: string;
  description: string;
  completed: "on" | "off";
}

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  const {
    id,
    description,
    completed = "off",
  } = Array.from(body.entries()).reduce<Partial<FormResponse>>(
    (acc, [key, value]) => {
      const a = value.valueOf();
      return { ...acc, [key]: a };
    },
    {}
  );
  console.log({ id, description, completed });
  if (typeof description === "string") {
    await TODOS.put(id || new Date().toISOString(), description, {
      metadata: {
        completed: completed === "on" ? true : false,
        lastModified: new Date().toISOString(),
      },
    });
  }

  return redirect("/");
};
