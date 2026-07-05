"use server";

import { getUser } from "@/api/user.api";
import Counter from "./counter";

export const fetchComponent = async () => {
  const data = await getUser();

  return <Counter data={data} />;
};
