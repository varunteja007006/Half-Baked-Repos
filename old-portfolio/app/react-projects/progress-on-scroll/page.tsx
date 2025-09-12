"use client";

import { cn } from "@/lib/utils";

function ProgressScroll({
  progressStyles,
  divStyles,
}: Readonly<{
  progressStyles?: string;
  divStyles?: string;
}>) {
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", function () {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progressBar: HTMLElement | null =
        document.getElementById("scroll-progress");
      if (progressBar) {
        const progress: number = (scrolled / scrollableHeight) * 100;
        progressBar.style.width = progress + "%";
      }
    });
  }

  return (
    <div>
      <div
        id="scroll-progress"
        className={cn("fixed top-0 left-0 z-50 h-2 bg-red-400", progressStyles)}
      ></div>
      <div className={cn("h-[200vh]", divStyles)}>
        <h1 className="sticky top-24">Scroll down to see the progress</h1>
      </div>
    </div>
  );
}
export default ProgressScroll;
