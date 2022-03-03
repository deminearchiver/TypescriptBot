import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js";
import { Client } from "../structures/Client";

export interface ExtendedInteration extends CommandInteraction {
    member: GuildMember;

}

interface RunOptions {
    client: Client,
    interaction: ExtendedInteration,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;

export type CommandType = {
    userPermissions?: PermissionResolvable[];
    run: RunFunction;
} & ChatInputApplicationCommandData;