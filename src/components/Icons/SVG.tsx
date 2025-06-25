import type { JSX } from "react";

import { palette } from "../../styles/palette";
import { IconTypes, type IconName, type IconType } from "../../types/TIcon";

type IconProps = {
  type?: IconType;
};

const IconTypesColor: Record<IconType, string> = {
  [IconTypes.DEFAULT]: palette.white,
  [IconTypes.BLUE]: palette.blue,
  [IconTypes.BLUE_HOVER]: palette.blueHover,
  [IconTypes.GREY]: palette.grey,
  [IconTypes.LIGHT_BLUE]: palette.lightBlue,
  [IconTypes.ERROR]: palette.red,
  [IconTypes.BLACK]: palette.black,
  [IconTypes.GREY_MEDIUM]: palette.greyMedium,
  [IconTypes.DARK_MEDIUM]: palette.darkMedium,
};

const getIconColor = (type?: IconType) => {
  return type ? IconTypesColor[type] : IconTypesColor.default;
};

const Search = ({ type }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={getIconColor(type)}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21 21-4.34-4.34" />
    <circle cx="11" cy="11" r="8" />
  </svg>
);

const Temp = ({ type }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={getIconColor(type)}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
  </svg>
);
const MinTemp = ({ type }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={getIconColor(type)}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m10 20-1.25-2.5L6 18" />
    <path d="M10 4 8.75 6.5 6 6" />
    <path d="M10.585 15H10" />
    <path d="M2 12h6.5L10 9" />
    <path d="M20 14.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
    <path d="m4 10 1.5 2L4 14" />
    <path d="m7 21 3-6-1.5-3" />
    <path d="m7 3 3 6h2" />
  </svg>
);
const MaxTemp = ({ type }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={getIconColor(type)}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 9a4 4 0 0 0-2 7.5" />
    <path d="M12 3v2" />
    <path d="m6.6 18.4-1.4 1.4" />
    <path d="M20 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
    <path d="M4 13H2" />
    <path d="M6.34 7.34 4.93 5.93" />
  </svg>
);
const Wind = ({ type }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke={getIconColor(type)}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
    <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
    <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
  </svg>
);
const Undo = ({}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11" />
  </svg>
);
const Remove = ({}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const iconMap: Record<IconName, (props: IconProps) => JSX.Element> = {
  search: (props) => <Search {...props} />,
  temp: (props) => <Temp {...props} />,
  minTemp: (props) => <MinTemp {...props} />,
  maxTemp: (props) => <MaxTemp {...props} />,
  wind: (props) => <Wind {...props} />,
  undo: (props) => <Undo {...props} />,
  remove: (props) => <Remove {...props} />,
};
