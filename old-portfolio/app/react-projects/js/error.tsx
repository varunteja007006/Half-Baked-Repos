"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Error() {
  return (
    <React.Fragment>
      <div>Error</div>
      <Button onClick={() => window.location.reload()}>Refresh</Button>
    </React.Fragment>
  );
}
