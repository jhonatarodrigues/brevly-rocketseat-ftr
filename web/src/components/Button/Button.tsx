interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-base text-white px-6 py-3.5 rounded-lg w-full hover:bg-blue-dark transition-all font-semibold text-sm cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {label}
    </button>
  );
};

//opacity-50 hover:opacity-100 transition-opacity
