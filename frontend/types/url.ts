export interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clickCount: number;
  createdAt: string;
}

export interface Click {
  id: string;
  urlId: string;
  clickedAt: string;
}

export interface UrlStats {
  url: Url;
  totalClicks: number;
  clicks: Click[];
}
