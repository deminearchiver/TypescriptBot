import { CommandInteractionOptionResolver } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";
import { ExtendedInteration } from "../typings/Command";

export default new Event("interactionCreate", async (interaction) => {
    // Chat input command
    if(interaction.isCommand()) {
        // await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.followUp("You have used a non-existent command");
        if(!interaction.memberPermissions.has(command.userPermissions)) return interaction.reply("You do not have the permission to run this command!");
        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteration
        });
    }
})