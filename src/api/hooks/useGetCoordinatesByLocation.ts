import { useQuery } from "@tanstack/react-query";
import { geocodingService } from "../../services/geocoding.service";
import type { GetCurrentWeatherParams } from "../../types/Types";
import { errorCatch } from "../error";

export function useGetCoordinatesByLocation(params: GetCurrentWeatherParams) {
  const {
    data: coordinatesList,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["get_coordinates_by_location", params.q],
    queryFn: () => geocodingService.getCoordinatesByLocation(params),
    enabled: !!params.q,
  });

  return { coordinatesList, isLoading, isFetching, error: errorCatch(error ?? "") };
}
