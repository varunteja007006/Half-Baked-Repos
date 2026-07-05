"use client";

import React from "react";

export default function ShadowDOM() {
  const hostRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (hostRef.current === null) return;
    const hostElement = document.getElementById("host") || null;
    console.log(hostElement);
    if (hostElement !== null) {
      const shadow = hostElement.attachShadow({ mode: "open" });
      const span = document.createElement("span");
      span.textContent = "I'm in the shadow DOM";
      shadow.appendChild(span);
    }
  }, []);

  return (
    <div>
      I am not in Shadow DOM
      <div id="host" ref={hostRef}></div>
    </div>
  );
}
