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
