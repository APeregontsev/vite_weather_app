import { type IconName, type IconType } from "../../../types/TIcon";
import { Icon } from "../../Icons";
import style from "./style.module.scss";

type Props = { value: number; icon: IconName; iconType: IconType; label: string; isWind?: boolean };

export const CurrentWeatherItem = ({ value, icon, iconType, label, isWind }: Props) => {
  return (
    <div className={style.itemContainer}>
      <div className={style.itemTitleContainer}>
        <Icon name={icon} type={iconType} />
        <div className={style.itemTitle}>{label}</div>
      </div>
      <div className={style.itemValue}>
        {Math.round(value)} {!isWind ? "°C" : "m/s"}
      </div>
    </div>
  );
};
