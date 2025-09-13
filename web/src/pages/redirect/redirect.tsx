import { Block } from "#src/components/Block/Block";
import Logo_Icon from "#src/assets/svg/Logo_Icon.svg?react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UseLinks } from "#src/hooks/business/useLinks";

export const Redirect = () => {
  const { code } = useParams();
  const location = useLocation();
  const { getOriginalLink, updateAccessCount } = UseLinks();
  const navigate = useNavigate();
  const { originalLink, id } = location.state || {};
  const [linkRedirected, setLinkRedirected] = useState("");

  const handleUpdateAccessCount = async (id: string) => {
    await updateAccessCount(id);
  };

  useEffect(() => {
    const redirectToOriginalLink = async () => {
      if (originalLink) {
        await handleUpdateAccessCount(id);
        setLinkRedirected(originalLink);
        setTimeout(() => {
          window.open(originalLink, "_blank");
        }, 1000);
      } else if (code) {
        console.log("code", code);
        const response = await getOriginalLink(code);

        if (response?.originalUrl) {
          await handleUpdateAccessCount(response.id);
          setLinkRedirected(response.originalUrl);
          setTimeout(() => {
            window.location.href = response.originalUrl;
          }, 1000);
        } else {
          navigate("/404");
        }
      }
    };

    redirectToOriginalLink();
  }, []);

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
              href={linkRedirected}
              target="_blank"
              rel="noreferrer"
            >
              Acesse aqui
            </a>
          </p>
        </Block>
      </div>
    </div>
  );
};
