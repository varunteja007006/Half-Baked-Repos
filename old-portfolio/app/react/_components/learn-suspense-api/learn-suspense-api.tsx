"use client";

import { Button } from "@/components/ui/button";
import React from "react";
const LazyComponent = React.lazy(() => import("./lazy-component"));

const LearnSuspenseAPI = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
      {show && (
        <div>
          This is the hidden content 😟.
          <React.Suspense
            fallback={
              <p className="text-red-500">Loading the slow component....</p>
            }
          >
            <LazyComponent />
          </React.Suspense>
        </div>
      )}
    </div>
  );
};

export default LearnSuspenseAPI;
