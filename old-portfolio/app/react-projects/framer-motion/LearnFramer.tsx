"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./modal";

function LearnFramer() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  return (
    <div className="flex flex-col">
      {/* Button with framer animations 😀 */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 bg-fuchsia-400 rounded-full border-2 border-pink-600 w-fit"
        onClick={() => (modalOpen ? close() : open())}
      >
        Hello 😁 I am a Modal
      </motion.button>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && <Modal onClick={close} text={"Hello There!!!"} />}
      </AnimatePresence>
    </div>
  );
}

export default LearnFramer;
