import { Client } from "./structures/Client";

import { config } from "dotenv";

config();

const token: string = process.env.TOKEN;

export const client: Client = new Client({ 
  intents: 32767 
});

client.start(token, process.env.MONGOURI);

