import Logo from "#src/assets/svg/Logo.svg?react";
import { Block } from "#src/components/Block/Block";
import { Title } from "#src/components/Title/Title";

export const Home = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-200 ">
      <div className="flex-col">
        <div className="mb-8">
          <Logo />
        </div>
        <Block>
          <>
            <Title text="Novo link" />
          </>
        </Block>
      </div>
    </div>
  );
};
