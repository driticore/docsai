import { serial, text, timestamp, pgTable, varchar, integer, pgEnum } from "drizzle-orm/pg-core";

const userSystemEnum = pgEnum("user_system_enum", ["system", "user"])

export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  docsName: text("docs_name").notNull(),
  docsUrl: text("docs_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  userId: varchar("user_id", {length:256}).notNull(),
  fileKey: text("file_key").notNull()
});

export const messages = pgTable("messages", {
    id: serial("id").primaryKey(),
    chatId: integer("chat_id").references(()=>chats.id).notNull(),
    content: text("content").notNull(),
    role: userSystemEnum("role").notNull(),
  });