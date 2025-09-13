import { TriangleAlert } from "lucide-react";
import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col mb-4 w-full">
      <label
        htmlFor={props.name}
        className={`mb-2  text-xs text-trans uppercase  
        ${
          isFocused ? "text-blue-base" : error ? "text-danger" : "text-gray-500"
        }
        `}
      >
        {label}
      </label>
      <input
        id={props.name}
        className={`border focus:border-blue-base pt-4 pb-4 pl-6 pr-6 rounded-lg text-sm focus:outline-none placeholder:text-gray-400 text-gray-600 ${
          error ? "border-danger" : "border-gray-300"
        }`}
        onFocus={(e) => {
          setIsFocused(true);
          if (onFocus) {
            onFocus(e);
          }
        }}
        onBlur={(e) => {
          setIsFocused(false);
          if (onBlur) {
            onBlur(e);
          }
        }}
        {...props}
      />
      {error && (
        <div className="pt-2 flex items-center">
          <TriangleAlert className="size-4 text-danger" />
          <p className="text-gray-500 text-xs m-0 pl-2">{error}</p>
        </div>
      )}
    </div>
  );
};
