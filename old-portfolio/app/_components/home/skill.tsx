import { Card, CardTitle } from "@/components/ui/card";
import * as React from "react";
import industrySkillsData from "@/app/_components/home/data/industrySkillsData";
import technicalSkillsData from "@/app/_components/home/data/technicalSkillsData";

export default function Skills() {
  const technicalSkillTypes = React.useMemo(() => {
    return Object.keys(technicalSkillsData) as Array<
      keyof typeof technicalSkillsData
    >;
  }, []);

  return (
    <section id="skills" className="space-y-20">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Technical Skills</h3>

        {technicalSkillTypes.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <p className="font-semibold">{technicalSkillsData[item].label}</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {technicalSkillsData[item].skillList.map((item) => {
                  if (!item.toShow) {
                    return null;
                  }
                  return (
                    <Card key={item.name}>
                      <div className="flex gap-5 items-center p-5">
                        <item.icon className="size-12" />
                        <CardTitle className="text-base">{item.name}</CardTitle>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Industry Skills</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {industrySkillsData.map((item) => {
            if (!item.toShow) {
              return null;
            }
            return (
              <Card key={item.id}>
                <div className="flex gap-5 items-center p-5">
                  <item.icon className="size-12" />
                  <CardTitle className="text-base">{item.name}</CardTitle>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
