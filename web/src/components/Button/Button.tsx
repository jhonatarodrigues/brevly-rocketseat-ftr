interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-blue-base  text-white px-6 py-3.5 rounded-lg w-full opacity-50 hover:opacity-100 transition-opacity font-semibold text-sm cursor-pointer"
      {...props}
    >
      {label}
    </button>
  );
};
