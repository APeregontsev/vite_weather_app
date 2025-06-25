import type { FC } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { useGetCurrentWeatherByCity } from "../../api/hooks/useGetCurrentWeather";
import { Button, CurrentWeatherCard, HistoryCard, Icon, Input, Title } from "../../components";
import { capitalizeFirstLetter } from "../../helpers/capitalizeFirstLetter";
import { useStore } from "../../store/store";
import { IconTypes } from "../../types/TIcon";
import style from "./style.module.scss";
import { useDeletePendingOnUnload } from "./useDeletePendingOnUnload";
import { useIsMobile } from "./useIsMobile";

type Props = {};
type FormData = { city: string };

export const Weather: FC<Props> = ({}) => {
  const { history, addCity, removeCity, undoRemoveCity } = useStore();

  const [city, setCity] = React.useState<string>("");

  useDeletePendingOnUnload();

  const isMobile = useIsMobile();

  const { currentWeather, isLoading, error } = useGetCurrentWeatherByCity({
    q: city,
    units: "metric",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<FormData>({
    mode: "onChange",
  });

  // Sorry guys, I ran out of time, so this functionality isn’t completed
  // same goes for the autocomplete component for city selection via the geo_coordinates endpoint

  /*   const {
    weatherForecast,
    isLoading: weatherForecastIsLoading,
    error: weatherForecasterror,
  } = useGetWeatherForecast({
    q: city,
    units: "metric",
  }); */

  function onSubmit(formData: FormData) {
    setCity(formData.city);
    addCity(formData.city);
  }

  const handleHistoryItemClick = async (city: string, isPending: boolean) => {
    if (isPending) return;

    setValue("city", city);
    await trigger();

    setCity(city);
  };

  const handleHistoryItemRemove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
    isPending: boolean
  ) => {
    e.stopPropagation();

    if (!isPending) {
      removeCity(id);
    } else {
      undoRemoveCity(id);
    }
  };

  return (
    <>
      <Title>Weather forecast</Title>
      <div className={style.wrapper}>
        <div className={style.innerWrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={style.formWrapper}>
            <Input
              placeholder={"Please enter city"}
              id="city"
              type="text"
              label={"Enter city"}
              {...register("city", {
                required: "Can’t be empty",
              })}
              errorMessage={errors?.city?.message || capitalizeFirstLetter(error) || ""}
            />

            <Button type="submit">
              <Icon name="search" type={IconTypes.DEFAULT} />
            </Button>
          </form>
          {isMobile && <CurrentWeatherCard isLoading={isLoading} currentWeather={currentWeather} />}

          <HistoryCard
            history={history}
            onItemClick={handleHistoryItemClick}
            onItemRemove={handleHistoryItemRemove}
          />
        </div>
        {!isMobile && <CurrentWeatherCard isLoading={isLoading} currentWeather={currentWeather} />}
      </div>
    </>
  );
};
