import type { Request } from "express";

export type TypedParams<T extends Record<string, string>> = Request<T>;
