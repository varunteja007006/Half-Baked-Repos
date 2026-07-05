import { create } from "zustand";

type TLocationPoints = {
  lat: number | string | null;
  lon: number | string | null;
};

type TTempUnit = "kelvin" | "celsius" | "fahrenheit";

export type TWeatherLocationStore = {
  location: TLocationPoints;
  name: string | null;
  weather: any;
  tempUnit: TTempUnit;
  updateLocation: (newLocation: TLocationPoints) => void;
  updateName: (newName: string | null) => void;
  updateWeather: (newWeather: any) => void;
  updateTempUnit: (newTempUnit: TTempUnit) => void;
};

const useLocationStore = create<TWeatherLocationStore>((set) => ({
  location: { lat: null, lon: null },
  name: "",
  weather: null,
  tempUnit: "celsius",
  updateLocation: (newLocation: TLocationPoints) =>
    set({ location: newLocation }),
  updateName: (newName: string | null) => set({ name: newName }),
  updateWeather: (newWeather: any) => set({ weather: newWeather }),
  updateTempUnit: (newTempUnit: TTempUnit) => set({ tempUnit: newTempUnit }),
}));

export { useLocationStore };
