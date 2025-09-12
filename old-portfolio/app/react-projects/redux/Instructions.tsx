import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const LANGUAGE = "jsx";

export default function Instructions() {
  return (
    <div className="space-y-3">
      <p>How do you setup redux</p>
      <div>
        <SyntaxHighlighter
          style={atomDark}
          language={LANGUAGE}
          customStyle={{ margin: 0 }}
        >
          {`
        // Install react redux and redux toolkit 
        // https://redux-toolkit.js.org/introduction/getting-started

        // npm install @reduxjs/toolkit
        // npm install react-redux

        // ----------------------------------------------------------------------------------

        // create slice file - counterSlice.tsx
        import { createSlice } from "@reduxjs/toolkit";
        // create a initial state
        const initialState = {
        count: 0,
        emoji: "😉",
        };

        const counterSlice = createSlice({
        name: "counter", //This name can be anything
        initialState,
        reducers: {
            increment: (state) => {
            state.count += 1;
            state.emoji = "😉";
            },
            decrement: (state) => {
            state.count -= 1;
            state.emoji = "😢";
            },
        },
        });

        export const { increment, decrement } = counterSlice.actions;
        export default counterSlice.reducer;
        
        // ----------------------------------------------------------------------------------

        // Now create store file - store.tsx
        // This will be used to serve all the slices
        import { configureStore } from "@reduxjs/toolkit";
        import counterReducer from "@/features/counterSlice";

        export const store = configureStore({
        reducer: {
            counter: counterReducer, // we access "counter" by using useSelector hook hence this naming is essential
        },
        });

        // ----------------------------------------------------------------------------------

        // Now to serve the slices we need to wrap the app in a provider
        import { Provider } from "react-redux";
        import { store } from "@/store/store";  

        function MyApp({ children }: Readonly<{ children: ReactNode }>) {
        return (
            <Provider store={store}>{children}</Provider>
        );
        }

        export default MyApp;


        // ----------------------------------------------------------------------------------
        
        // After wrapping the app now we can access the store items, in our case it
        // is counter 


        "use client";
        import React from "react";
        import { useDispatch, useSelector } from "react-redux";
        import { increment, decrement } from "@/features/counterSlice";
        import { Button } from "@/components/ui/button";

        export default function Page() {
        const { count, emoji } = useSelector((state: any) => state.counter);
        const dispatch = useDispatch();

        return (
            <div className="flex flex-col space-y-4">
                <div>
                    <p>Count: {count}</p>
                    <p>Emoji: {emoji}</p>
                </div>
                <div className="flex gap-5">
                    <Button variant={"warning"} onClick={() => dispatch(increment())}>
                    Increment
                    </Button>
                    <Button variant={"warning"} onClick={() => dispatch(decrement())}>
                    Decrement
                    </Button>
                </div>
            </div>
        );
        }
        `}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
