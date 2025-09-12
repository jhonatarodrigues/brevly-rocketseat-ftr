interface LittleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  lucideIcon?: React.ReactNode;
  className?: string;
}

export const LittleButton = ({
  text,
  lucideIcon,
  className = "",
  ...props
}: LittleButtonProps) => {
  return (
    <button
      className={`bg-gray-200  p-2 rounded-sm text-xs font-semibold text-gray-500 hover:bg-gray-300 cursor-pointer flex items-center opacity-50 hover:opacity-100 transition-all ${className}`}
      {...props}
    >
      {lucideIcon}
      {text ? <span className="ml-2">{text}</span> : ""}
    </button>
  );
};
