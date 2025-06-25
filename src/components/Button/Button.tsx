import cn from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import "./styles.scss";

type TButton = {
  outlined?: boolean;
  fullwidth?: boolean;
  icon?: boolean;
  text?: boolean;
  info?: boolean;
  active?: boolean;
  purple?: boolean;
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & TButton;

export const Button = ({
  outlined,
  fullwidth,
  children,
  icon,
  info,
  purple,
  active,
  text,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <button
      {...rest}
      className={cn("btn", {
        wide: fullwidth,
        outline: outlined,
        icon: icon,
        info: info,
        active: active,
        purple: purple,
        text: text,
      })}
    >
      <div className="btn-inner-wrapper">{children}</div>
    </button>
  );
};
