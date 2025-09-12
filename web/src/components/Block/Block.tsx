type BlockProps = {
  children: React.ReactNode;
};

export const Block = ({ children }: BlockProps) => {
  return <div className="p-8 bg-gray-100 rounded-lg">{children}</div>;
};
