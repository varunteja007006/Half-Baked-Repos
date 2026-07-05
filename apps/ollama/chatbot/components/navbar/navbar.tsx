import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../toggle-theme-btn";
import { Bot } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 px-5 border-b shadow">
      <div className="flex items-center justify-center gap-2">
        <Bot />
        <Link href="/" className="font-semibold text-lg mt-1">
          Chatbot
        </Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
