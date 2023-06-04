import React from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

function Modal({ onClick, text }) {
  const dropIn = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: { y: "100vh", opacity: 0 },
  };
  return (
    <>
      <Backdrop onClick={onClick}>
        <motion.div
          drag
          onClick={(e) => e.stopPropagation()}
          className="w-100 lg:w-1/2 h-1/2 flex flex-col items-center m-auto p-2 border-4 border-orange-400 bg-orange-200 cursor-default"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p> {text} </p>
          <motion.button
            className="w-fit p-2 bg-fuchsia-400 rounded-full border-2 border-pink-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
          >
            Close
          </motion.button>
        </motion.div>
      </Backdrop>
    </>
  );
}

export default Modal;
