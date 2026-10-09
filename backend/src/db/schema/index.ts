import { pgTable, serial, varchar, timestamp, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    name: varchar("name", {
        length: 100,
    }).notNull(),

    email: varchar("email", {
        length: 255,
    }).notNull().unique(),

    passwordHash: varchar("password_hash", {
        length: 255,
    }),

    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const teams = pgTable("teams", {
    id: serial("id").primaryKey(),

    name: varchar("name", {
        length: 100,
    }).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),

    name: varchar("name", {
        length: 100,
    }).notNull(),

    desciption: varchar("description"),

    teamid: integer("team_id").notNull().references(() => teams.id),

    createdAt: timestamp("created_at").defaultNow().notNull()
});