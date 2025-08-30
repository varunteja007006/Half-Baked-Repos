import React from "react";

import dynamic from "next/dynamic";

const Swapy = dynamic(() => import("./swapy"), { ssr: false });

export default function Main() {
  return (
    <div className="max-w-[1400px] dark:bg-blue-950 bg-orange-500 px-6 py-4 w-full min-h-screen dark:border-l-violet-950 dark:border-r-violet-950  ">
      <Swapy />
    </div>
  );
}
