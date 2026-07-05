import React from "react";
import experienceData from "@/app/_components/home/data/experienceData";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  addYears,
  differenceInMonths,
  differenceInYears,
  format,
  parse,
} from "date-fns";
import _ from "lodash";

function calcExp(date1: string, date2: string) {
  const resigningDate = new Date(parse(date1, "yyyy-MM-dd", new Date()));
  const joiningDate = new Date(parse(date2, "yyyy-MM-dd", new Date()));

  // Calculate the difference in years
  let years = differenceInYears(resigningDate, joiningDate);
  // Calculate the remaining months after accounting for the years
  let months = differenceInMonths(resigningDate, addYears(joiningDate, years));

  // Handle the case where months are negative
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `${years}.${months}`;
}

export default function Experience() {
  return (
    <section id="experience" className="space-y-4">
      <h3 className="text-xl font-semibold">Experience</h3>
      <div className="grid grid-cols-1 gap-4">
        {experienceData.map((item) => {
          if (!item.toShow) {
            return null;
          }

          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex gap-3 items-center text-lg">
                  {item.jobTitle}{" "}
                  {item.current && (
                    <Badge
                      variant="outline"
                      className="ring-1 ring-blue-400 dark:ring-purple-600"
                    >
                      Current
                    </Badge>
                  )}
                  {item.current ? (
                    <Badge variant="outline">
                      Exp:{" "}
                      {calcExp(
                        format(new Date(), "yyyy-MM-dd"),
                        item.dateOfJoining
                      )}{" "}
                      yrs
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      Exp: {calcExp(item.dateOfResigning, item.dateOfJoining)}
                      {"  "}
                      yrs
                    </Badge>
                  )}
                </CardTitle>

                <div className="space-y-4">
                  <p className="mb-2 text-sm text-gray-600 dark:text-white">
                    {item.company}
                  </p>
                  <span>
                    <p className="mb-2 text-base font-semibold text-black dark:text-white">
                      Job Description:
                    </p>
                    <ul className="space-y-3 list-disc list-inside text-black dark:text-white">
                      {item.jobDescription.map((item, index) => (
                        <li key={index} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </span>
                </div>
              </CardHeader>
              <CardFooter className="text-sm">
                {item.workingFrom} {item.workingTill && `- ${item.workingTill}`}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
