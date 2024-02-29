import { ButtonHTMLAttributes } from "react";
import style from "./style.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode | string;
}

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;

  return (
    <button className={style.button} {...rest}>
      {children}
    </button>
  );
};
