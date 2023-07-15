import { React, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CodeBlock from "../../main/CodeBlock";

function Card() {
  const [flipcard, setFlipcard] = useState(false);
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
        <motion.a
          className="text-black border border-red-500 bg-pink-400 h-fit p-2"
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
            className=" w-fit h-fit bg-teal-300 p-3"
          >
            {flipcard && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 5 } }}
              >
                "Bruh! you got flipped"
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="democard"
            className=" w-fit h-fit bg-teal-300 p-3"
            animate={{ rotateY: 0, transition: { duration: 3 } }}
          >
            "You fine Bruh!!"
          </motion.div>
        )}

        <button
          className="bg-red-300 px-3 py-0 border-2 border-red-700 hover:bg-red-700 hover:text-white"
          onClick={() => (flipcard ? setFlipcard(false) : setFlipcard(true))}
        >
          Flip it bruh!!
        </button>
      </AnimatePresence>
    </div>
  );
}

export default Card;
