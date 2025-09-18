type TitleProps = {
  text: string;
};

export const Title = ({ text }: TitleProps) => {
  return <h1 className="text-gray-600 font-bold text-lg">{text}</h1>;
};
