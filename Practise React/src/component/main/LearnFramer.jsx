import { motion, AnimatePresence } from "framer-motion";
import { React, useState } from "react";
import Modal from "../framer motion/modal";
import CodeBlock from "./CodeBlock";

function LearnFramer() {
  const [modalOpen, setModalOpen] = useState(false);
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  return (
    <CodeBlock>
      <div className="flex flex-col">
        <h1 className="text-2xl mb-3">Learn Framer Motion for React 💙</h1>
        {/* Button with framer animations 😀 */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-fit p-2 bg-fuchsia-400 rounded-full border-2 border-pink-600"
          onClick={() => (modalOpen ? close() : open())}
        >
          Helloo 😁
        </motion.button>
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={() => null}
        >
          {modalOpen && (
            <Modal
              modalOpen={modalOpen}
              onClick={close}
              text={"Hello There!!!"}
            />
          )}
        </AnimatePresence>
      </div>
    </CodeBlock>
  );
}

export default LearnFramer;
