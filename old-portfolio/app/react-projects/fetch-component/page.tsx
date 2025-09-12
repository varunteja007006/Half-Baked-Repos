import React from "react";
import { fetchComponent } from "./actions";
import MyComponent from "./MyComponent";

export default async function FetchComponent() {
  const data = await fetchComponent();
  return <MyComponent data={data} />;
}
