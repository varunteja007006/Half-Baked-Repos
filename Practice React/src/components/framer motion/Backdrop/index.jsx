import { motion } from "framer-motion";

import React from "react";

function Backdrop({ children, onClick }) {
  return (
    <>
      <motion.div
        className=" absolute top-0 left-0 h-full w-full bg-black/20 flex items-center  justify-center cursor-pointer"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default Backdrop;
