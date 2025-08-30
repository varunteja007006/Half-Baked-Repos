"use client";

import Transition from "@/components/framer-motion/transition";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Transition>{children}</Transition>;
}
