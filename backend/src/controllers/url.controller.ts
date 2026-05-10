import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createUrlSchema } from "../validations/url.schema";
import {
  createUrlService,
  deleteUrlService,
  getUrlByIdService,
  getUrlsService,
  getUrlStatsService,
  redirectUrlService,
} from "../services/url.service";
import { Env } from "../config/env.config";
import { TypedParams } from "../types/express.types";

export const createUrl = asyncHandler(async (req: Request, res: Response) => {
  const parsedResult = createUrlSchema.safeParse(req.body);

  if (!parsedResult.success) {
    res.status(422).json({
      success: false,
      message: "Validation Error",
      errors: parsedResult.error.issues.map((i) => ({
        path: i.path,
        message: i.message,
      })),
    });
    return;
  }

  const { url } = await createUrlService(parsedResult.data, req.user!.userId);

  res.status(201).json({
    success: true,
    url: {
      ...url,
      shortUrl: `${Env.BASE_URL}/${url.shortCode}`,
    },
  });
});

export const getUrls = asyncHandler(async (req: Request, res: Response) => {
  const { urls } = await getUrlsService(req.user!.userId);

  res.status(200).json({
    success: true,
    urls: urls.map((url) => ({
      ...url,
      shortUrl: `${Env.BASE_URL}/${url.shortCode}`,
    })),
  });
});

export const getUrlById = asyncHandler(
  async (req: TypedParams<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const { url } = await getUrlByIdService(id, req.user!.userId);

    res.status(200).json({
      success: true,
      url: { ...url, shortUrl: `${Env.BASE_URL}/${url.shortCode}` },
    });
  },
);

export const deleteUrl = asyncHandler(
  async (req: TypedParams<{ id: string }>, res: Response) => {
    const { id } = req.params;

    await deleteUrlService(id, req.user!.userId);

    res
      .status(200)
      .json({ success: true, message: "URL deleted successfully" });
  },
);

export const getUrlStats = asyncHandler(
  async (req: TypedParams<{ id: string }>, res: Response) => {
    const { id } = req.params;

    const { url, totalClicks, clicks } = await getUrlStatsService(
      id,
      req.user!.userId,
    );

    res.status(200).json({
      success: true,
      url: { ...url, shortUrl: `${Env.BASE_URL}/${url.shortCode}` },
      totalClicks,
      clicks,
    });
  },
);

export const redirectUrl = asyncHandler(
  async (req: TypedParams<{ shortCode: string }>, res: Response) => {
    const { shortCode } = req.params;

    const { originalUrl } = await redirectUrlService(shortCode);
    res.redirect(originalUrl);
  },
);
