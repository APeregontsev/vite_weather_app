export const IconTypes = {
  BLACK: "black",
  BLUE_HOVER: "blue_hover",
  BLUE: "blue",
  DEFAULT: "default",
  ERROR: "error",
  GREY: "grey",
  LIGHT_BLUE: "light_blue",
  GREY_MEDIUM: "grey_medium",
  DARK_MEDIUM: "dark_medium",
} as const;

export type IconType = (typeof IconTypes)[keyof typeof IconTypes];

export type IconName = "search" | "temp" | "minTemp" | "maxTemp" | "wind" | "undo" | "remove";

export interface IIcon {
  name: IconName;
  type?: (typeof IconTypes)[keyof typeof IconTypes];
}
