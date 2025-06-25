import type { IIcon } from "../../types/TIcon";
import { iconMap } from "./SVG";

export const Icon = (props: IIcon) => {
  const IconComponent = iconMap[props.name];

  return <IconComponent {...props} />;
};
