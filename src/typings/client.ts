import { ApplicationCommandDataResolvable } from "discord.js";

export interface RegisterCommandOptions {
    guildID?: string;
    commands: ApplicationCommandDataResolvable[];
}