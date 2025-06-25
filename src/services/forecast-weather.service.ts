import { axiosClassic } from "../api/interceptors";
import type { ForecastWeatherResponse, GetCurrentWeatherParams } from "../types/Types";

class ForecastWeatherService {
  private BASE_URL = "/data/2.5/forecast";

  async getWeatherForecastByCity(params: GetCurrentWeatherParams) {
    const response = await axiosClassic.get<ForecastWeatherResponse>(this.BASE_URL, { params });
    return response.data;
  }
}

export const forecastWeatherService = new ForecastWeatherService();
