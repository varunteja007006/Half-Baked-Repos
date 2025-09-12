"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import React, { ReactElement } from "react";

const NO_OF_IMAGES = 5000;

export default function LearnUseTransitionDemo() {
  const [text, setText] = React.useState("");
  const [images, setImages] = React.useState<ReactElement[]>([]);
  const [show, setShow] = React.useState(false);
  const [isLoading, startTransition] = React.useTransition();

  const [slowShow, setSlowShow] = React.useState(false);
  const [slowImages, setSlowImages] = React.useState<ReactElement[]>([]);

  React.useEffect(() => {
    if (show) {
      startTransition(() => {
        const newImages = Array.from({ length: NO_OF_IMAGES }, (_, index) => {
          return (
            <Image
              key={index}
              className="h-40  w-50"
              src="/other/crystal_blue_cube.jpg"
              alt="crystal blue cube"
              width={100}
              height={100}
              unoptimized={true}
            />
          );
        });
        setImages(newImages);
      });
    }
  }, [show]);

  React.useEffect(() => {
    if (slowShow) {
      const newImages = Array.from({ length: NO_OF_IMAGES }, (_, index) => {
        return (
          <Image
            key={index}
            className="h-40  w-50"
            src="/other/crystal_blue_cube.jpg"
            alt="crystal blue cube"
            width={100}
            height={100}
            unoptimized={true}
          />
        );
      });
      setSlowImages(newImages);
    }
  }, [slowShow]);

  return (
    <div className="space-y-4">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
      <div className="flex flex-wrap gap-4 items-center">
        <Button onClick={() => setShow(!show)}>Show Optimized Gallery</Button>
        <Button onClick={() => setSlowShow(!slowShow)}>
          Show Un-optimized Gallery
        </Button>
      </div>
      <ScrollArea className="h-[180px] max-width-[500px] px-4 py-2">
        <p>Optimized Gallery</p>
        {show &&
          (isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex gap-4 items-center">{images}</div>
          ))}
        <ScrollBar className="px-2 mt-3" orientation="horizontal" />
      </ScrollArea>
      <ScrollArea className="h-[180px] max-width-[500px] px-4 py-2">
        <p>Un-optimized Gallery</p>
        {slowShow && (
          <div className="flex gap-4 items-center">{slowImages}</div>
        )}
        <ScrollBar className="px-2 mt-3" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
