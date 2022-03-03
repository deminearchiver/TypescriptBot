import { Command } from "../../structures/Command";

export default new Command({
    name: "ping",
    description: "Replies with pong",
    run: async ({ interaction }) => {
        await interaction.deferReply({ephemeral: true});
        await interaction.followUp("Pong!");
    }
});