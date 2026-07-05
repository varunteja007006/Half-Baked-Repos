import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { NavbarContextProvider } from "./context/NavbarContext.jsx";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Theme>
    <NavbarContextProvider>
      <App />
    </NavbarContextProvider>
  </Theme>
);
