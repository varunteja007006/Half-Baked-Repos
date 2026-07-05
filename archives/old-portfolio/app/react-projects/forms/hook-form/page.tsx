import React from "react";
import ReactHookFormArray from "../_components/react-hook-form-array";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { localAPI } from "@/constants/api.constants";

async function getData() {
  try {
    const res = await fetch(`${localAPI}/company`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

export type dataType = {
  id: string;
  Company: string;
  users: {
    name: string;
    email: string;
  }[];
};

export default async function Page() {
  const data = await getData();

  return (
    <div className="space-y-6">
      <h1 className="text-xl">Hook forms</h1>
      <div className="grid grid-cols-1 gap-5 justify-center md:grid-cols-2 item-start">
        <Card className="p-5 space-y-6">
          <ScrollArea className="w-full max-h-40">
            {data?.map((item: dataType, index: number) => (
              <div key={item.id} className="mb-2">
                <Button variant="link" asChild>
                  <Link href={`/react-projects/forms/hook-form/${item.id}`}>
                    {item.Company}
                  </Link>
                </Button>
              </div>
            ))}
          </ScrollArea>
        </Card>
        <div>
          <ReactHookFormArray id={null} />
        </div>
      </div>
    </div>
  );
}
