import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 0, emoji: "😉" };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
      state.emoji = '😉';
    },
    decrement: (state) => {
        state.count -= 1;
        state.emoji = '😢';
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;
