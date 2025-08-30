"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DebouncedInput from "@/components/common/debounced-input";
import { useQuery } from "react-query";
import { Weather } from "@/api/weather.api";
import _ from "lodash";
import { useLocationStore } from "@/store/weather/base_store";

export default function SearchBox() {
  const [value, setValue] = React.useState("");
  const store = useLocationStore((state) => state);

  const searchedLocations = useQuery(
    ["searchedLocations", value],
    () => Weather.getLocation(value),
    {
      enabled: !!value,
    }
  );

  React.useEffect(() => {
    if (searchedLocations.data) {
      if (!_.isEmpty(searchedLocations.data.data)) {
        const { lat, lon, name } = searchedLocations.data.data[0];
        store.updateLocation({ lat, lon });
        store.updateName(name);
      }
    }
  }, [searchedLocations.data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search</CardTitle>
        <CardDescription>Searching for: {value || ""}</CardDescription>
      </CardHeader>
      <CardContent>
        <DebouncedInput
          setValue={setValue}
          loading={searchedLocations.isLoading}
          options={[]}
        />
      </CardContent>
    </Card>
  );
}
