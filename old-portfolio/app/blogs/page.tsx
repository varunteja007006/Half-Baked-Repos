"use client";
import React from "react";
import Main from "./_components/Main";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4 m-4 rounded-xl shadow dark:bg-black bg-white min-h-screen">
      <h1 className="text-xl font-bold">Blogs:</h1>
      <Main />
    </div>
  );
}
