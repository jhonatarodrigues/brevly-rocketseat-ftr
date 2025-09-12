interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col mb-4 w-full">
      <p className="mb-2 text-gray-500 text-xs text-trans uppercase">{label}</p>
      <input
        className="border border-gray-300 pt-4 pb-4 pl-6 pr-6 rounded-lg text-sm focus:outline-none placeholder:text-gray-400 text-gray-600"
        {...props}
      />
    </div>
  );
};
