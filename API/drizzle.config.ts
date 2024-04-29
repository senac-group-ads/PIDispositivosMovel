import type { Config } from "drizzle-kit";
export default {
  schema: "./build/repository/drizzle/index.js",
  out: "./drizzle",
  driver: "pg",
} satisfies Config;