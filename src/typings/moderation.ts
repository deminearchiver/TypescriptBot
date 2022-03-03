import { Guild, TextChannel } from "discord.js";

export interface PurgeOptions {
    guild: Guild;
    channel: TextChannel;
    amount: number
}