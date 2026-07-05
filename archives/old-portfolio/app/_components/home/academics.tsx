import React from "react";
import academicData from "@/app/_components/home/data/academicData";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Academics() {
  return (
    <section id="academics" className="space-y-4">
      <h3 className="text-xl font-semibold">Academics</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {academicData.map((item) => {
          if (!item.toShow) {
            return null;
          }
          return (
            <Card
              key={item.id}
              className="flex flex-col justify-between h-full"
            >
              <CardHeader>
                <CardTitle className="text-lg">{item.course}</CardTitle>
                <CardDescription>
                  {item.institute} - {item.year}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <p className="text-sm font-semibold">{item.score}</p>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
