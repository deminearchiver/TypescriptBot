import { MessageEmbed } from "discord.js";
import { Command } from "../../structures/Command";

export default new Command({
    name: "about",
    description: "Shows some info about the bot",
    run: async ({ interaction }) => {
        const embed = new MessageEmbed({
            author: {
                name: "DeMineArchiver",
                url: "https://deminearchiver.carrd.co",
                iconURL:"https://cdn.discordapp.com/avatars/565170227109691412/4f717cd23b966539ebb856a925694b06.png"
            },
            color: "LIGHT_GREY",
            title: "About The Imagination Collab Bot",
            description: "This bot was created by <@565170227109691412> from [**TheBoiz Team**](https://www.youtube.com/channel/UC1IPyZQXsRph54f03jNaEEQ) specially for [**The Imagination Collab**]()",
            fields: [{
                name: "IDE Used",
                value: "[Microsoft Visual Studio Code](https://code.visualstudio.com/)",
                inline: true
            },{
                name: "Programming Languages used",
                value: "TypeScript, JavaScript",
                inline: true
            }]
        });
        interaction.reply({ embeds: [embed] });
    }
});