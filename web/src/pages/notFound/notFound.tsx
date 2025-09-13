import { Block } from "#src/components/Block/Block";
import NotFoundIcon from "#src/assets/svg/404.svg?react";

export const NotFound = () => {
  return (
    <div className="h-dvh w-full flex items-center justify-center bg-gray-200 px-5">
      <div className="w-5xl items-center flex justify-center w-xs-full">
        <Block className="md:py-16 md:px-12 py-12 px-5  items-center flex flex-col md:w-[580px] w-full">
          <NotFoundIcon />

          <p className="text-2xl font-bold text-gray-600 my-6">
            Link não encontrado
          </p>

          <p className="text-center text-gray-500 text-sm font-semibold">
            O link que você está tentando acessar não existe, foi removido ou é
            uma URL inválida. Saiba mais em{" "}
            <a
              className="text-blue-base cursor-pointer decorations-none hover:underline"
              href="/"
            >
              brev.ly
            </a>
            .
          </p>
        </Block>
      </div>
    </div>
  );
};
