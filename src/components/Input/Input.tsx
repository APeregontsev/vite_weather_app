import cn from "clsx";
import { forwardRef, type InputHTMLAttributes } from "react";
import { Label } from "../Label/Label";
import "./styles.scss";

type TInput = { color?: "blue" | "red"; label?: string; empty?: boolean; errorMessage?: string };

type Props = InputHTMLAttributes<HTMLInputElement> & TInput;

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ color, label, empty, errorMessage, ...rest }, ref) => {
    return (
      <div className={cn("input-wrapper", color, { empty: !!errorMessage })}>
        <Label id={rest.id} text={label} />

        <div className={cn("inner-input-wrapper", color)}>
          <input ref={ref} {...rest} className={cn("login-input", color)} />
          <p className="warning">{errorMessage}</p>
        </div>
      </div>
    );
  }
);
