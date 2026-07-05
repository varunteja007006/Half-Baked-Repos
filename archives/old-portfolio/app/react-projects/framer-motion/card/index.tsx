"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Card() {
  const [flipcard, setFlipcard] = React.useState(false);
  return (
    <div className="flex flex-row gap-5 my-10">
      <AnimatePresence>
        <motion.div
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
          className="p-5 bg-violet-300 border-2 border-violet-700 w-fit"
        >
          <motion.h2>😁</motion.h2>
        </motion.div>
        <motion.div
          whileHover={{ scale: [null, 1.5, 1.4] }}
          transition={{ duration: 0.3 }}
          className="p-5 bg-violet-300 border-2 border-violet-700 w-fit"
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
          className="p-5 bg-violet-300 border-2 border-violet-700 w-fit"
        >
          <motion.h5>😎</motion.h5>
        </motion.div>
        <motion.a
          className="p-2 text-black bg-pink-400 border border-red-500 h-fit"
          href="https://www.google.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          This is a link
        </motion.a>

        {flipcard ? (
          <motion.div
            key="democard"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 180, transition: { duration: 3 } }}
            className="p-3 bg-teal-300  w-fit h-fit"
          >
            {flipcard && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 5 } }}
              >
                {"Bruh! you got flipped"}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="democard"
            className="p-3 bg-teal-300  w-fit h-fit"
            animate={{ rotateY: 0, transition: { duration: 3 } }}
          >
            {"You fine Bruh!!"}
          </motion.div>
        )}

        <button
          className="py-0 px-3 bg-red-300 border-2 border-red-700 hover:bg-red-700 hover:text-white"
          onClick={() => (flipcard ? setFlipcard(false) : setFlipcard(true))}
        >
          {" Flip it bruh!!"}
        </button>
      </AnimatePresence>
    </div>
  );
}

export default Card;
