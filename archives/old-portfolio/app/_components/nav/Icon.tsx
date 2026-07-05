import React from "react";

import { motion } from "framer-motion";

export default function Icon() {
  return (
    <motion.div
      initial={{ translateY: -100 }}
      animate={{ translateY: 0 }}
      whileHover={{ translateY: [null, 3, 0, 3, 0] }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
    >
      <a href="/">{`<Developer />`}</a>
    </motion.div>
  );
}
