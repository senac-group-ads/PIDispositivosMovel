import type { Config } from "drizzle-kit";
export default {
  schema: "./src/repository/drizzle/index.ts",
  out: "./drizzle",
  driver: "pg",
} satisfies Config;