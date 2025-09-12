import React from "react";
import certificationData from "@/app/_components/home/data/certificationData";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Certifications() {
  return (
    <section id="certifications" className="space-y-4">
      <h3 className="text-xl font-semibold">Certifications</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certificationData.map((item) => {
          if (!item.toShow) {
            return null;
          }
          return (
            <Card key={item.id}>
              <CardHeader className="flex flex-col justify-between h-full">
                <CardTitle className="text-md">
                  {item.certificate_name}
                </CardTitle>
                <CardDescription className="self-end ">
                  - {item.certificate_provider}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
