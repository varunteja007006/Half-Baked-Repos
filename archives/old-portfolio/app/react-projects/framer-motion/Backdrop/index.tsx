"use client";
import { motion } from "framer-motion";

import React from "react";

function Backdrop({
  children,
  onClick,
}: Readonly<{
  children: React.ReactNode;
  onClick: () => void;
}>) {
  return (
    <motion.div
      className=" absolute top-0 left-0 h-screen w-screen bg-black/20 flex items-center  justify-center cursor-pointer"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
