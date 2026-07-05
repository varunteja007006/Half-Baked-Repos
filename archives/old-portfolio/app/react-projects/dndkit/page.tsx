import React from "react";
import { MixedSortingDemo } from "./_components/mixed-sorting-demo";
import { VerticalSortingDemo } from "./_components/vertical-sorting-demo";

export default function Page() {
  return (
    <div className="space-y-6">
      <MixedSortingDemo />
      <VerticalSortingDemo />
    </div>
  );
}
