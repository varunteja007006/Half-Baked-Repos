import { React, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBlock from "../../main/CodeBlock";

function Card() {
  return (
    <div className="flex flex-row gap-5 my-10">
      <AnimatePresence>
        <motion.div
          // animate={{ x: [0, 100, 0], rotate: 10 }}
          // animate={{ x: [null, 100, 0], rotate: 10 }}
          // transition={{ ease: "easeOut", duration: 2 }}
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="border-2 border-violet-700 bg-violet-300 w-fit p-5"
        >
          <motion.h2>😁</motion.h2>
        </motion.div>

        <motion.div
          whileHover={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 }}
          className="border-2 border-violet-700 bg-violet-300 w-fit p-5"
        >
          <motion.h5>🤣</motion.h5>
        </motion.div>

        <motion.div
          initial={{ opacity: 0.6 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 1 },
          }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1 }}
          className="border-2 border-violet-700 bg-violet-300 w-fit p-5"
        >
          <motion.h5>😎</motion.h5>
        </motion.div>
        <motion.a className="text-black border border-red-500 bg-pink-400 h-fit p-2"
          href="https://www.google.com"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >This is a link</motion.a>
      </AnimatePresence>
    </div>
  );
}

export default Card;
