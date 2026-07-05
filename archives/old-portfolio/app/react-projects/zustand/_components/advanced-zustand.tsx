"use client";
import React from "react";
import { useStore } from "../store/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdvancedZustand() {
  const users = useStore((state) => state.users);
  const fetchUser = useStore((state) => state.fetchUser);

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Advanced Implementation</CardTitle>
        <CardDescription>
          This is a zustand example. This includes use of middleware like immer
          to manage deeply nested state, persistent storage, and also combining
          multiple zustand stores into one.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-2 rounded-md border">
          <p className="mb-2 text-lg text-monospace">
            {`|| Users fetched using the store ||`}
          </p>
          <ul>
            {users
              ? users?.map((user) => (
                  <li className="list-disc list-inside " key={user?.id}>
                    {user?.name}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        Checkout the documentation for zustand here: {/* */}
        <a
          href="https://docs.pmnd.rs/zustand/getting-started/introduction"
          className="text-blue-800 underline ms-2"
        >
          Link
        </a>
      </CardFooter>
    </Card>
  );
}
