"use client";

import useFetchAgainHook from "@/hooks/fetch-again";
import React from "react";
import _ from "lodash";

type Data = {
  id: number;
  title: string;
  userId: number;
};

export default function FetchAgain() {
  const url = `https://jsonplaceholder.typicode.com/albums`;
  const {
    data,
    isLoading,
    error,
  }: { data: Data[] | null; isLoading: boolean; error: unknown } =
    useFetchAgainHook(url, 5000);

  return (
    <div>
      ------------- FetchAgain ----------------
      <div className="min-h-[calc(100vh-20rem)]">
        {error
          ? `Oops something went wrong!!!`
          : isLoading
          ? `Loading...`
          : data && !_.isEmpty(data)
          ? (data as Data[]).map((item: Data) => item.title)
          : `No data`}
      </div>
    </div>
  );
}
