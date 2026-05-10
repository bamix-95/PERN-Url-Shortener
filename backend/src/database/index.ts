import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Env } from "../config/env.config";
import * as schema from "./schema";

const sql = neon(Env.DATABASE_URL);

export const db = drizzle(sql, { schema });
