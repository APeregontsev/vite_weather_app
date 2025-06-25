import { useQuery } from "@tanstack/react-query";
import { forecastWeatherService } from "../../services/forecast-weather.service";
import type { GetCurrentWeatherParams } from "../../types/Types";
import { errorCatch } from "../error";

export function useGetWeatherForecast(params: GetCurrentWeatherParams) {
  const {
    data: weatherForecast,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["get_weather_forecast_by_city", params.q],
    queryFn: () => forecastWeatherService.getWeatherForecastByCity(params),
    enabled: !!params.q,
  });

  return { weatherForecast, isLoading, isFetching, error: errorCatch(error ?? "") };
}
