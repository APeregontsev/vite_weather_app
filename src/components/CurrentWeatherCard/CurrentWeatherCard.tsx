import { IconTypes } from "../../types/TIcon";
import type { CurrentWeatherResponse } from "../../types/Types";
import { Loading } from "../Loader/Loader";
import { CurrentWeatherHeader } from "./CurrentWeatherHeader/CurrentWeatherHeader";
import { CurrentWeatherItem } from "./CurrentWeatherItem/CurrentWeatherItem";
import style from "./style.module.scss";

type Props = { isLoading: boolean; currentWeather?: CurrentWeatherResponse };

export const CurrentWeatherCard = ({ isLoading, currentWeather }: Props) => {
  const currentWeatherData = currentWeather?.main;
  const currentWeatherDescription = currentWeather?.weather[0];

  return (
    <div className={style.cardWrapper}>
      {isLoading ? (
        <div className={style.loaderWrapper}>
          <Loading />
        </div>
      ) : (
        <>
          {!currentWeather && <div className={style.noDataWrapper}>No data</div>}

          {currentWeather && (
            <div className={style.innerWrapper}>
              <CurrentWeatherHeader
                imageName={currentWeatherDescription?.icon}
                description={currentWeatherDescription?.description || ""}
                alt={currentWeather?.weather[0].description}
              />

              <CurrentWeatherItem
                value={currentWeatherData?.temp ?? 0}
                icon="temp"
                iconType={IconTypes.BLACK}
                label="Current temp"
              />

              <CurrentWeatherItem
                value={currentWeatherData?.temp_min ?? 0}
                icon="minTemp"
                iconType={IconTypes.BLUE_HOVER}
                label="Min temp"
              />

              <CurrentWeatherItem
                value={currentWeatherData?.temp_max ?? 0}
                icon="maxTemp"
                iconType={IconTypes.ERROR}
                label="Max temp"
              />

              <CurrentWeatherItem
                value={currentWeather?.wind?.speed ?? 0}
                icon="wind"
                iconType={IconTypes.BLACK}
                label="Wind speed"
                isWind
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
