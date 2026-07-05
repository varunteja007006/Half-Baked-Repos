import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const FOLDER = `react-projects`;

const urls = [
  {
    url: `/${FOLDER}/basic/form-data`,
    title: "Form Data",
    description: "Basic form data",
  },
  {
    url: `/${FOLDER}/basic/react-children`,
    title: "React Children",
    description: "Passing props to children props",
  },
];

export default function Page() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Basic</h2>
      <p className="text-sm">A list of few basic projects are here</p>
      <ul className="grid grid-cols-2 gap-5 items-stretch md:grid-cols-4 lg:grid-cols-6 justify-stretch">
        {urls.map((url) => (
          <li
            key={url.url}
            className="p-2 pl-3 rounded-md border border-gray-500"
          >
            <div className="flex flex-col gap-3 font-semibold">
              {url.title}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {url.description}
              </span>
              <Button variant={"default"} asChild>
                <Link href={url.url} className="text-sm">
                  Click here
                </Link>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
