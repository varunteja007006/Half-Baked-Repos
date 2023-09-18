import { useState } from "react";

function UseToggle(defaultValue) {
  const [show, setShow] = useState(defaultValue);
  const toggle = () => {
    setShow(!show);
  };
  return { show, toggle };
}

export default UseToggle;
