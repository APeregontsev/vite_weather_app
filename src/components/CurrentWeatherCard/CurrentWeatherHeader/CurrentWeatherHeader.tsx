import { capitalizeFirstLetter } from "../../../helpers/capitalizeFirstLetter";
import style from "./style.module.scss";

type Props = { imageName?: string; description: string; alt?: string };

export const CurrentWeatherHeader = ({ imageName, description, alt }: Props) => {
  return (
    <div className={style.headerWrapper}>
      <div className={style.imageWrapper}>
        {!!imageName && <img src={`http://openweathermap.org/img/w/${imageName}.png`} alt={alt}></img>}

        <div className={style.imageTitle}>{capitalizeFirstLetter(description)}</div>
      </div>
    </div>
  );
};
