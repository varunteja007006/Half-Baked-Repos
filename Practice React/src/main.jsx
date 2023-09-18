import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
import { ThemeContextProvider } from "./context/ThemeContext";
import { UnsplashGlobalContextProvider } from "./context/UnsplashGlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeContextProvider>
        <UnsplashGlobalContextProvider>
          <App />
          <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
        </UnsplashGlobalContextProvider>
      </ThemeContextProvider>
    </Provider>
  </QueryClientProvider>
);
