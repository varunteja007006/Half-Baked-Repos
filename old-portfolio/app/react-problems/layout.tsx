import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div className="p-3 lg:px-10 lg:py-5">{children}</div>;
}
