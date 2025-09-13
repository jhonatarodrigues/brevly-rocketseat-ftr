import { useEffect, useState } from "react";
import Logo from "#src/assets/svg/Logo.svg?react";
import { Block } from "#src/components/Block/Block";
import { Button } from "#src/components/Button/Button";
import { Input } from "#src/components/Input/Input";
import { ItemLink } from "#src/components/ItemLink/ItemLink";
import { LittleButton } from "#src/components/LitteButton/LitteButton";
import { Title } from "#src/components/Title/Title";
import { UseLinks } from "#src/hooks/business/useLinks";
import { Download } from "lucide-react";
import type { LinksResponse } from "#src/repositories/types/links";
import { EmptyLinks } from "#src/components/EmptyLinks/EmptyLinks";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { zodResolver } from "@hookform/resolvers/zod";
import z, { set } from "zod";

type FormData = {
  originalLink: string;
  shortLink?: string;
};

const schema = z.object({
  originalLink: z.string().url("insira uma URL válida com http:// ou https://"),
  shortLink: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, "Digite apenas letras e números")
    .optional(),
});

export const Home = () => {
  const { getLinks, createLink, downLoadCSV, deleteLink } = UseLinks();
  const [sending, setSending] = useState(false);

  const [links, setLinks] = useState<LinksResponse["links"] | undefined>(
    undefined
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const getAllLinks = async () => {
    const response = await getLinks();
    if (response) {
      setLinks(response.links);
    }
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  const handleSendCreateLink = async (data: FormData) => {
    setSending(true);

    console.log("data", data);

    const response = await createLink({
      originalLink: data.originalLink,
      shortLink: data.shortLink,
    });

    if (response?.shortUrl) {
      getAllLinks();
      reset();
      setTimeout(() => {
        Swal.fire({
          title: "Sucesso!",
          text: `Link encurtado criado com sucesso. \n ${
            import.meta.env.VITE_FRONTEND_URL
          }/${response.shortUrl}`,
          icon: "success",
          confirmButtonText: "OK",
        });
      }, 500);
    }
    setSending(false);
  };

  const handleDownloadCsv = async () => {
    const response = await downLoadCSV();
    if (response?.url) {
      window.open(response.url, "_blank");
    }
  };

  const handleDeleteLink = async (id: string) => {
    const response = await deleteLink(id);

    console.log("response", response);
    if (response?.message) {
      getAllLinks();
      setTimeout(() => {
        Swal.fire({
          title: "Sucesso!",
          text: response.message,
          icon: "success",
          confirmButtonText: "OK",
        });
      }, 500);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    const newLink = import.meta.env.VITE_FRONTEND_URL + "/" + text;
    navigator.clipboard.writeText(newLink);
    Swal.fire({
      title: "Copiado!",
      text: "Link encurtado copiado para a área de transferência.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="md:h-dvh w-full flex items-center justify-center bg-gray-200 p-5">
      <div className="md:w-5xl w-full ">
        <div className="mb-8 items-center flex justify-center md:justify-start">
          <Logo />
        </div>
        <div className="flex md:flex-row flex-col w-full items-stretch">
          <div className="flex-col w-full flex-1 md:mr-5 mb-3 md:mb-0">
            <Block className="w-full">
              <form onSubmit={handleSubmit(handleSendCreateLink)}>
                <div className="mb-6">
                  <Title text="Novo link" />
                </div>
                <div>
                  <Input
                    label="Link Original"
                    placeholder="http://www.exemplo.com.br"
                    {...register("originalLink", {
                      required: "Link original obrigatório",
                    })}
                    error={errors.originalLink?.message}
                  />
                  <Input
                    label="Link Encurtado"
                    baseText={import.meta.env.VITE_FRONTEND_URL + "/"}
                    {...register("shortLink")}
                    error={errors.shortLink?.message}
                  />
                </div>
                <div className="mt-6">
                  <Button
                    type="submit"
                    label="Salvar Link"
                    disabled={sending}
                  />
                </div>
              </form>
            </Block>
          </div>

          <div className="md:w-xl w-full  ">
            <Block className="w-full h-full  items-stretch flex flex-1 flex-col md:pb-0.5">
              <div className="mb-5 flex justify-between items-center">
                <Title text="Meus Links" />
                <LittleButton
                  text="Baixar CSV"
                  lucideIcon={<Download className="size-4" />}
                  onClick={handleDownloadCsv}
                />
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="w-full h-full md:overflow-y-auto pb-8 md:max-h-[277px]  md:pb-8">
                {links && links.length === 0 ? (
                  <EmptyLinks />
                ) : (
                  links?.map((link) => (
                    <ItemLink
                      key={link.id}
                      id={link.id}
                      originalLink={link.originalUrl}
                      shortLink={link.shortUrl}
                      accessCount={link.visits}
                      onDelete={() => handleDeleteLink(link.id)}
                      onCopy={() => handleCopyToClipboard(link.shortUrl)}
                    />
                  ))
                )}
              </div>
            </Block>
          </div>
        </div>
      </div>
    </div>
  );
};
