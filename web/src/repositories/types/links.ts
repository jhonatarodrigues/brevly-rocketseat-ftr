export interface LinksResponse {
  links: Array<{
    id: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: string;
    visits: number;
  }>;
}

export interface CreateLinkResponse {
  message: string;
  shortUrl: string;
}

export interface DownloadCSVResponse {
  url: string;
}

export interface DeleteLinkResponse {
  message: string;
}
