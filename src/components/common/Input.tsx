import { forwardRef } from "react";
import type { InputProps } from "../../constant/types";

interface InputPropsWithIcon extends InputProps {
  onIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputPropsWithIcon>(
  (
    {
      type,
      icon,
      placeholder,
      value,
      setValue,
      onIconClick,
      onChange,
      onBlur,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full py-4 pr-4 pl-12 rounded-lg border border-gray-300 focus:outline-none"
          value={value}
          onChange={
            onChange ? onChange : (e) => setValue && setValue(e.target.value)
          }
          ref={ref}
          onBlur={onBlur}
          {...rest}
        />
        {icon && (
          <button
            type="button"
            className="absolute left-4 top-4"
            onClick={onIconClick}
          >
            {icon}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
