import { axiosClassic } from "../api/interceptors";
import type { CurrentWeatherResponse, GetCurrentWeatherParams } from "../types/Types";

class CurrentWeatherService {
  private BASE_URL = "/data/2.5/weather";

  async getCurrentWeatherByCity(params: GetCurrentWeatherParams) {
    const response = await axiosClassic.get<CurrentWeatherResponse>(this.BASE_URL, { params });
    return response.data;
  }
}

export const currentWeatherService = new CurrentWeatherService();
