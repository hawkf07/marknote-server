import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as dotenv from "dotenv";
import * as schema from './schema'
dotenv.config({});

const client = new Client(process.env.POSTGRES_CONNECTIONSTRING)
  .connect()
  .then((response) =>
    console.log("database is connected with response: ")
  )
  .catch((error) =>
    console.log("database is not connected with error: ", error)
  );
export const db = drizzle(client,{schema})
