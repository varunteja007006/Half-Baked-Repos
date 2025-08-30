import axios from "./config/axios";

export class Weather {
  static async getLocation(keywords: string | null) {
    if (!keywords) {
      return;
    }
    const response = await axios.get(
      `/geo/1.0/direct?q=${keywords}&limit=5&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`
    );
    return response;
  }
  static async getCurrentWeather({
    lat,
    lon,
  }: {
    lat: number | string | null;
    lon: number | string | null;
  }) {
    if (!lat || !lon) {
      return;
    }
    const response = await axios.get(
      `/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`
    );
    return response;
  }
}
