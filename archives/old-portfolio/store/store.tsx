import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer, // we access "counter" by using useSelector hook hence this naming is essential
  },
});
