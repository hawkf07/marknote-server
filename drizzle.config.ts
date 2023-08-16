import { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env.local",
});

export default {
  driver: "pg",
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.POSTGRES_CONNECTIONSTRING as string,
  },
} satisfies Config;
