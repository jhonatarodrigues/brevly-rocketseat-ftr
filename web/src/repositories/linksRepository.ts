import type { CreateLinkParams } from "#src/hooks/business/useLinks";
import api from "#src/service/api";
import type {
  CreateLinkResponse,
  DeleteLinkResponse,
  DownloadCSVResponse,
  LinksResponse,
} from "./types/links";

const LinksRepository = {
  getLinks: async (): Promise<LinksResponse> => {
    const response = await api.get("/");

    return response.data;
  },

  createLink: async ({
    originalLink,
    shortLink = "",
  }: CreateLinkParams): Promise<CreateLinkResponse> => {
    const response = await api.post("/generate-link", {
      url: originalLink,
      ...(shortLink ? { shortUrl: shortLink } : {}),
    });

    return response.data;
  },

  downloadCSV: async (): Promise<DownloadCSVResponse> => {
    const response = await api.get("/export-csv");

    return response.data;
  },

  deleteLink: async (id: string): Promise<DeleteLinkResponse> => {
    const response = await api.delete(`/delete-link/${id}`);

    return response.data;
  },
};

export default LinksRepository;
