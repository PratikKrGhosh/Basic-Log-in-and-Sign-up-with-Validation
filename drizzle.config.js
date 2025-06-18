import { defineConfig } from "drizzle-kit";
import env from "./server/config/env.js";

export default defineConfig({
  out: "./server/drizzle/migrations",
  schema: "./server/drizzle/schema.js",
  dialect: "mysql",
  dbCredentials: {
    url: env.db,
  },
});
