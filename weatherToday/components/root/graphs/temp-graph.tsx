"use client";

import * as React from "react";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useLocationStore } from "@/store/weather/base_store";
import { formatDate } from "@/utils/helper.utils";
import { tempConverter } from "@/utils/temp.utils";
import { motion } from "framer-motion";

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  feels_like: {
    label: "Feels Like",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function TempGraph() {
  const store = useLocationStore((state) => state);

  const data = React.useMemo(
    () =>
      store.weather?.hourly?.map((d: any) => ({
        ...d,
        temp: tempConverter(d.temp, store.tempUnit),
        feels_like: tempConverter(d.feels_like, store.tempUnit),
      })) || [],
    [store.weather?.hourly, store.tempUnit]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Chart - Gradient</CardTitle>
        <CardDescription>Showing hourly temperature</CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
        >
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
                bottom: 100,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="dt"
                tickLine={false}
                axisLine={false}
                tickMargin={35}
                tickFormatter={(value) =>
                  formatDate(value, "dd MMM HH:mm") ?? ""
                }
                angle={-45}
                includeHidden
              />
              <ChartTooltip
                labelFormatter={(_) => `Temperature`}
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <defs>
                <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-temp)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-temp)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillFeels_Like" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-feels_like)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-feels_like)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Area
                dataKey="feels_like"
                type="natural"
                fill="url(#fillFeels_Like)"
                fillOpacity={0.4}
                stroke="var(--color-feels_like)"
                stackId="a"
              />
              <Area
                dataKey="temp"
                type="natural"
                fill="url(#fillTemp)"
                fillOpacity={0.4}
                stroke="var(--color-temp)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </motion.div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
