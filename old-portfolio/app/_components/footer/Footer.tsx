import * as React from "react";
import ContactIcons from "../home/contact-icons";

export default function Footer() {
  return (
    <footer className="min-w-[99vw] mt-24 flex flex-col gap-10 items-center justify-between p-10 dark:bg-black dark:border-black bg-blue-100 border-t-2 border-t-blue-200">
      <ContactIcons />
      <div className="flex flex-col gap-4 justify-center items-center md:flex-row">
        <p>{`-- Made with React 💙 & Next JS 🤍 --`}</p>

        <p>{`< Developer />`}</p>

        <p>{`-- Varun Teja K --`}</p>
      </div>
    </footer>
  );
}
