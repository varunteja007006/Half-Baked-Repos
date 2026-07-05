"use client";

import React from "react";

export default function useToggleShow(defaultValue?: boolean) {
  const [show, setShow] = React.useState(defaultValue || false);

  const toggle = () => setShow(!show);

  return { show, toggle };
}
