import { useQuery } from "@tanstack/react-query";
import { currentWeatherService } from "../../services/current-weather.service";
import type { GetCurrentWeatherParams } from "../../types/Types";
import { errorCatch } from "../error";

export function useGetCurrentWeatherByCity(params: GetCurrentWeatherParams) {
  const {
    data: currentWeather,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["get_current_weather_by_city", params.q],
    queryFn: () => currentWeatherService.getCurrentWeatherByCity(params),
    enabled: !!params.q,
  });

  return { currentWeather, isLoading, isFetching, error: errorCatch(error ?? "") };
}
