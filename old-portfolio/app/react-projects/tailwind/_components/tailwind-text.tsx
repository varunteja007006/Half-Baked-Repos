import React from "react";

export default function TailwindProse() {
  return (
    <div className="space-y-5">
      <h1 className="mb-3 text-2xl">Tailwind Prose</h1>
      <div className="red-box"></div>
      <div className="p-3 text-center custom-class">Hello</div>
      <article className="p-3 mt-3 bg-white prose lg:prose-xl">
        <h1>Garlic bread with cheese: What the science tells us</h1>
        <p>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </p>
        <p>
          need structing/tailwind/GridSubgrid.tsx But a recent study shows that
          the celebrated appetizer may be linked to a series of rabies cases
          springing up around the country.
        </p>
      </article>
    </div>
  );
}
