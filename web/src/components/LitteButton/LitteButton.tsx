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
  disabled,
  ...props
}: LittleButtonProps) => {
  return (
    <button
      className={` p-2 rounded-sm text-xs font-semibold text-gray-500 bg-gray-300 border border-gray-300 hover:border-blue-base cursor-pointer flex items-center  transition-all ${className}
      
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  
      `}
      {...props}
    >
      {lucideIcon}
      {text ? <span className="ml-2">{text}</span> : ""}
    </button>
  );
};
