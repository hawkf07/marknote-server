import { NodePgClient, drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as dotenv from "dotenv";
import * as schema from "./schema";
dotenv.config({
  path:".env.local"
});

const client = new Client(process.env.POSTGRES_CONNECTIONSTRING);
client
  .connect()
  .then((response) => {
    console.log("database is connected successfuly");
    return response;
  })
  .catch((error) => {
    console.log("error", error);
  });
export const db = drizzle(client, { schema });
