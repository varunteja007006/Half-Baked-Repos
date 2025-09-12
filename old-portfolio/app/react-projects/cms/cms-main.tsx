"use client";

import React from "react";
import { FetchProjects } from "./cms-fetch-projects";
import CmsCard from "./cms-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CmsMain({ tokens }: Readonly<{ tokens: any }>) {
  const { loading, projects } = FetchProjects(tokens);

  return (
    <>
      {/* hero part */}
      <Card className="dark:bg-transparent/[0.3]">
        <CardHeader>
          <CardTitle>Contentful API Integration</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            `Loading`
          ) : (
            <div className="flex flex-wrap gap-2 justify-start items-center">
              {projects.length > 1
                ? projects.map((item: any) => {
                    return <CmsCard key={item.id} data={item}></CmsCard>;
                  })
                : "Something went wrong"}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default CmsMain;
