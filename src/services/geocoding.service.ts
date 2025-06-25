import { axiosClassic } from "../api/interceptors";
import type { ForecastWeatherResponse, GetCurrentWeatherParams } from "../types/Types";

class GeocodingService {
  private BASE_URL = "/geo/1.0/direct";

  async getCoordinatesByLocation(params: GetCurrentWeatherParams) {
    const response = await axiosClassic.get<ForecastWeatherResponse>(this.BASE_URL, { params });
    return response.data;
  }
}

export const geocodingService = new GeocodingService();
