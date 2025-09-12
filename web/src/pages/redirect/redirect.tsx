import { Block } from "#src/components/Block/Block";
import Logo_Icon from "#src/assets/svg/Logo_Icon.svg?react";

export const Redirect = () => {
  return (
    <div className="h-dvh w-full flex items-center justify-center bg-gray-200 p-5">
      <div className="w-5xl items-center flex justify-center">
        <Block className="md:py-16 md:px-12 py-12 px-5 items-center flex flex-col  md:w-[580px] w-full">
          <Logo_Icon />

          <p className="text-2xl font-bold text-gray-600 my-6">
            Redirecionando...
          </p>

          <p className="text-center text-gray-500 text-sm font-semibold">
            O link será aberto automaticamente em alguns instantes. <br />
            Não foi redirecionado?{" "}
            <a
              className="text-blue-base cursor-pointer decorations-none hover:underline"
              href="#redirect"
            >
              Acesse aqui
            </a>
          </p>
        </Block>
      </div>
    </div>
  );
};
