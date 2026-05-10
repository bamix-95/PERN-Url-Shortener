import { and, count, desc, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../database";
import { clicks, urls } from "../database/schema";
import { AppError } from "../utils/appError";
import type { CreateUrlInput } from "../validations/url.schema";

export const createUrlService = async (
  body: CreateUrlInput,
  userId: string,
) => {
  const { originalUrl, customSlug } = body;

  const shortCode = customSlug || nanoid(8);

  const existing = await db
    .select()
    .from(urls)
    .where(eq(urls.shortCode, shortCode));

  if (existing.length > 0) {
    throw new AppError(
      customSlug
        ? "That custom slug is already taken"
        : "Failed to generate short code, please try again",
      409,
    );
  }

  const [url] = await db
    .insert(urls)
    .values({
      id: nanoid(),
      originalUrl,
      shortCode,
      userId,
    })
    .returning();

  if (!url) throw new AppError("Failed to create URL", 500);

  return { url };
};

export const getUrlsService = async (userId: string) => {
  const result = await db
    .select({
      id: urls.id,
      originalUrl: urls.originalUrl,
      shortCode: urls.shortCode,
      createdAt: urls.createdAt,
      clickCount: count(clicks.id),
    })
    .from(urls)
    .leftJoin(clicks, eq(clicks.urlId, urls.id))
    .where(eq(urls.userId, userId))
    .groupBy(urls.id)
    .orderBy(desc(urls.createdAt));

  return { urls: result };
};

export const getUrlByIdService = async (id: string, userId: string) => {
  const [url] = await db
    .select()
    .from(urls)
    .where(and(eq(urls.id, id), eq(urls.userId, userId)));

  if (!url) throw new AppError("URL not found", 404);

  return { url };
};

export const deleteUrlService = async (id: string, userId: string) => {
  const [url] = await db
    .select()
    .from(urls)
    .where(and(eq(urls.id, id), eq(urls.userId, userId)));

  if (!url) throw new AppError("URL not found", 404);

  await db.delete(urls).where(eq(urls.id, id));
};

export const getUrlStatsService = async (id: string, userId: string) => {
  const [url] = await db
    .select()
    .from(urls)
    .where(and(eq(urls.id, id), eq(urls.userId, userId)));

  if (!url) throw new AppError("URL not found", 404);

  const allClicks = await db
    .select()
    .from(clicks)
    .where(eq(clicks.urlId, id))
    .orderBy(desc(clicks.clickedAt));

  return {
    url,
    totalClicks: allClicks.length,
    clicks: allClicks,
  };
};

export const redirectUrlService = async (shortCode: string) => {
  const [url] = await db
    .select()
    .from(urls)
    .where(eq(urls.shortCode, shortCode));

  if (!url) throw new AppError("URL not found", 404);

  // Track the click
  await db.insert(clicks).values({
    id: nanoid(),
    urlId: url.id,
  });

  return { originalUrl: url.originalUrl };
};
