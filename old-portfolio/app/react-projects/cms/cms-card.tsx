import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import React from "react";

type propsType = {
  img: string;
  url: string;
  title: string;
};

function CmsCard({
  data,
}: Readonly<{
  data: propsType;
}>) {
  const { img, url, title } = data;
  return (
    <Card className="space-y-3 dark:bg-transparent/[0.4]">
      <img className="p-2 rounded-lg size-96" src={img} alt={title} />
      <CardFooter>
        <Button variant={"outline"} asChild>
          <a href={url} className="mx-auto text-lg">
            {title.toUpperCase()}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CmsCard;
