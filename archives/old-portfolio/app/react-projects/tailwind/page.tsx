import TailwindPage from "./_components/react-slick-tailwind";
import React from "react";
import TailwindProse from "./_components/tailwind-text";
import TailwindGridSubgrid from "./_components/grid-subgrid";
import TailwindNumberInput from "./_components/tailwind-number-input";

export default function Page() {
  return (
    <div className="">
      <section className="space-y-4">
        <h2 className="text-xl">Tailwind based react slick - ONLY CSS</h2>
        <div className="space-y-10">
          <TailwindPage />
          <TailwindProse />
          <TailwindGridSubgrid />
          <TailwindNumberInput />
        </div>
      </section>
    </div>
  );
}
