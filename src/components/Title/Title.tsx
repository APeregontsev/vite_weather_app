import type { PropsWithChildren } from "react";
import style from "./style.module.scss";

type Props = {};

export const Title = ({ children }: PropsWithChildren<Props>) => {
  return (
    <div>
      <div className={style.title}>{children}</div>
    </div>
  );
};
