import LinksRepository from "#src/repositories/linksRepository";
import type {
  CreateLinkResponse,
  DeleteLinkResponse,
  DownloadCSVResponse,
  GetOriginalLinkResponse,
  LinksResponse,
} from "#src/repositories/types/links";
import Swal from "sweetalert2";

export type CreateLinkParams = {
  originalLink: string;
  shortLink?: string;
};

interface UseLinkResponse {
  getLinks: () => Promise<LinksResponse | undefined>;
  createLink: (
    props: CreateLinkParams
  ) => Promise<CreateLinkResponse | undefined>;
  downLoadCSV: () => Promise<DownloadCSVResponse | undefined>;
  deleteLink: (shortUrl: string) => Promise<DeleteLinkResponse | undefined>;
  getOriginalLink: (
    code: string
  ) => Promise<GetOriginalLinkResponse | undefined>;
  updateAccessCount: (id: string) => Promise<void>;
}

export const UseLinks = (): UseLinkResponse => {
  const getLinks = async () => {
    Swal.fire({
      title: "Carregando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await LinksRepository.getLinks();

      Swal.close();
      return response;
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Erro!",
        text: "Houve um erro ao buscar os links.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const createLink = async ({
    originalLink,
    shortLink = "",
  }: CreateLinkParams) => {
    Swal.fire({
      title: "Salvando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await LinksRepository.createLink({
        originalLink,
        shortLink,
      });

      Swal.close();
      return response;
    } catch (error: any) {
      Swal.close();
      Swal.fire({
        title: "Erro!",
        text: `Houve um erro ao salvar o link. ${
          error.response?.data?.message ?? ""
        }`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const downLoadCSV = async () => {
    console.log("download csv");
    Swal.fire({
      title: "Baixando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await LinksRepository.downloadCSV();

      Swal.close();
      return response;
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Erro!",
        text: "Houve um erro ao baixar o CSV.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const deleteLink = async (id: string) => {
    Swal.fire({
      title: "Deletando...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const response = await LinksRepository.deleteLink(id);

      Swal.close();
      return response;
    } catch (error) {
      Swal.close();
      Swal.fire({
        title: "Erro!",
        text: "Houve um erro ao deletar o link.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const getOriginalLink = async (code: string) => {
    try {
      const response = await LinksRepository.getOriginalLink(code);

      return response;
    } catch (error) {
      return undefined;
    }
  };

  const updateAccessCount = async (id: string) => {
    try {
      await LinksRepository.updateAccessCount(id);
    } catch (error) {
      console.log("Erro ao atualizar o contador de acessos", error);
    }
  };

  return {
    getLinks,
    createLink,
    downLoadCSV,
    deleteLink,
    getOriginalLink,
    updateAccessCount,
  };
};
