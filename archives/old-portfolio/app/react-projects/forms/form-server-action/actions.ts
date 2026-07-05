import { localAPI } from "@/constants/api.constants";
import { revalidatePath } from "next/cache";

export const postTodo = async (formData: FormData) => {
  "use server";
  const title = formData.get("title");
  const description = formData.get("description");

  const res = await fetch(`${localAPI}/todos`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  revalidatePath("/react-projects/forms/form-server-action");
};
