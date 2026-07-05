import { User } from "@/types/user";
import axios from "axios";

export async function getUser() {
  const response = await axios.get<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return response.data;
}

export async function getTabData() {
  const url = "https://course-api.com/react-tabs-project";

  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function getCartData() {
  const url = `http://localhost:3030/shoppingCart`;

  const res = await fetch(url);
  const data = await res.json();

  return data;
}
