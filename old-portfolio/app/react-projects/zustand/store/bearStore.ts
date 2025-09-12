import { create } from "zustand";

//types
export interface TBearStore {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (args: number) => void;
}

export const useBearStore = create<TBearStore>((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: TBearStore) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: number) => set({ bears: newBears }),
}));
