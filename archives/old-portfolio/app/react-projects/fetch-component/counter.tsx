"use client";

import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import React from "react";

export default function Counter({
  data,
}: Readonly<{ data: User[] | undefined }>) {
  const [count, setCount] = React.useState(0);
  return (
    <div className="flex flex-col gap-5 dark:text-white">
      <div>
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div key={item.id} className="grid grid-cols-3 gap-2 border">
              <div className="p-1 border-r">Name: {item.name}</div>
              <div className="p-1 border-r">Username: {item.username}</div>
              <div className="p-1">Email: {item.email}</div>
            </div>
          ))}
      </div>
      <Button onClick={() => setCount(count + 1)}>{count}</Button>
    </div>
  );
}
