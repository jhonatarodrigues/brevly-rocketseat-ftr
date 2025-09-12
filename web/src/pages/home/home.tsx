import Logo from "#src/assets/svg/Logo.svg?react";
import { Block } from "#src/components/Block/Block";
import { Button } from "#src/components/Button/Button";
import { Input } from "#src/components/Input/Input";
import { ItemLink } from "#src/components/ItemLink/ItemLink";
import { LittleButton } from "#src/components/LitteButton/LitteButton";
import { Title } from "#src/components/Title/Title";
import { Download } from "lucide-react";

export const Home = () => {
  return (
    <div className="md:h-dvh w-full flex items-center justify-center bg-gray-200 p-5">
      <div className="md:w-5xl w-full ">
        <div className="mb-8 items-center flex justify-center md:justify-start">
          <Logo />
        </div>
        <div className="flex md:flex-row flex-col w-full items-stretch">
          <div className="flex-col w-full flex-1 md:mr-5 mb-3 md:mb-0">
            <Block className="w-full">
              <div className="mb-6">
                <Title text="Novo link" />
              </div>
              <div>
                <Input label="Link Original" placeholder="www.exemplo.com.br" />
                <Input label="Link Encurtado" placeholder="www.brev.ly/" />
              </div>
              <div className="mt-6">
                <Button label="Salvar Link" />
              </div>
            </Block>
          </div>

          <div className="md:w-xl w-full  ">
            <Block className="w-full h-full  items-stretch flex flex-1 flex-col md:pb-0.5">
              <div className="mb-5 flex justify-between items-center">
                <Title text="Meus Links" />
                <LittleButton
                  text="Baixar CSV"
                  lucideIcon={<Download className="size-4" />}
                />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="w-full h-full md:overflow-y-auto pb-8 md:max-h-[277px]  md:pb-8">
                {/* <EmptyLinks /> */}

                <ItemLink
                  originalLink="www.google.com"
                  shortLink="www.goog.gl"
                  accessCount={30}
                />
                <ItemLink
                  originalLink="www.google.comasdasda.asdasd.asdas.dasda"
                  shortLink="www.goog.gl"
                  accessCount={30}
                />
                <ItemLink
                  originalLink="www.google.com"
                  shortLink="www.goog.gl"
                  accessCount={30}
                />
                <ItemLink
                  originalLink="www.google.com"
                  shortLink="www.goog.gl"
                  accessCount={30}
                />
                <ItemLink
                  originalLink="www.google.com"
                  shortLink="www.goog.gl"
                  accessCount={30}
                />
                <ItemLink
                  originalLink="www.google.com"
                  shortLink="www.goog.gl"
                  accessCount={30}
                />
              </div>
            </Block>
          </div>
        </div>
      </div>
    </div>
  );
};
