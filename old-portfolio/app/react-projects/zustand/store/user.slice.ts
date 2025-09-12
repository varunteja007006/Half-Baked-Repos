import { getUser } from "@/api/user.api";
import { User } from "@/types/user";
import { StateCreator } from "zustand";

type UserState = {
  users: null | User[];
};

type UserActions = {
  fetchUser: () => Promise<void>;
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  users: null,
  fetchUser: async () => {
    const data = await getUser();
    set((state) => ({ ...state, users: data }));
  },
});
