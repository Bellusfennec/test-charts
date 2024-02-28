import { InputHTMLAttributes } from "react";
import { RadioFiledVariant } from "../../../../types";
import { toFirstUpperCase } from "../../../../utils/string";
import style from "./style.module.scss";

interface RadioFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  variant?: RadioFiledVariant;
  type?: "radio";
  color?: string;
  label?: string;
  labelPosition?: "left" | "right";
}

export const RadioField = (props: RadioFieldProps) => {
  const { required, type = "radio" } = props;
  const { label, variant = "filled", color = "#0087ff", labelPosition = "left", ...rest } = props;

  return (
    <label
      className={`${style.container} ${style["variant" + toFirstUpperCase(variant)]}`}
      style={{ color: `${color}` }}
    >
      <input type={type} className={style.input} required={required} {...rest} />
      {label && <p className={`${style.label} ${style["label" + toFirstUpperCase(labelPosition)]}`}>{label}</p>}
    </label>
  );
};
