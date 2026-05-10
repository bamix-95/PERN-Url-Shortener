import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  isEmailVerified: boolean("is_email_verified").default(false).notNull(),
  emailVerificationToken: text("email_verification_token"),
  emailVerificationExpiry: timestamp("email_verification_expiry"),
  passwordResetToken: text("password_reset_token"),
  passwordResetExpiry: timestamp("password_reset_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const urls = pgTable("urls", {
  id: text("id").primaryKey(),
  originalUrl: text("original_url").notNull(),
  shortCode: text("short_code").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clicks = pgTable("clicks", {
  id: text("id").primaryKey(),
  urlId: text("url_id")
    .notNull()
    .references(() => urls.id, { onDelete: "cascade" }),
  clickedAt: timestamp("clicked_at").defaultNow().notNull(),
});
