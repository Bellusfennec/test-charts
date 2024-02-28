import { InputHTMLAttributes } from "react";
import style from "./style.module.scss";
import { toFirstUpperCase } from "../../../../utils/string";
import { FiledVariant, Size } from "../../../../types";

interface DataPickerFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  variant?: FiledVariant;
  scale?: Size;
  radius?: Size;
  disabled?: boolean;
}

export const DataPickerField = (props: DataPickerFieldProps) => {
  const { label, description, error, required } = props;
  const { scale = "md", radius = "md", variant = "default", ...rest } = props;

  return (
    <div className={style["size" + scale.toUpperCase()]}>
      {(label || description) && (
        <div className={style.title}>
          {label && (
            <p className={style.label}>
              {label} {required && <span className={style.required}>*</span>}
            </p>
          )}
          {description && <p className={style.description}>{description}</p>}
        </div>
      )}
      <label
        className={`${style.container} ${style["radius" + radius.toUpperCase()]} ${
          style["variant" + toFirstUpperCase(variant)]
        }`}
      >
        <input type={"date"} className={style.input} required={required} {...rest} />
      </label>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};
