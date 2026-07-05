import React from "react";
import TabBody from "./_component/tabs-body";
import { getTabData } from "@/api/user.api";

export interface TData {
  id: string;
  order: number;
  title: string;
  dates: string;
  duties: string[];
  company: string;
}

async function getData() {
  try {
    const data = await getTabData();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Page() {
  const data = await getData();

  if (!data || data.length === 0) {
    return <>No Data</>;
  }

  return (
    <div className="">
      <TabBody data={data} />
    </div>
  );
}
