interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Block = ({ children, className, ...props }: BlockProps) => {
  return (
    <div
      className={` p-5 md:p-8 bg-gray-100 rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
