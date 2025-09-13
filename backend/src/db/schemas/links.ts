import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  shortUrl: text("short_url").notNull(),
  originalUrl: text("original_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  visits: integer("visits").notNull().default(0),
});
