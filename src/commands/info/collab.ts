import { Emoji, MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../../structures/Command";
import { client } from "../..";

export default new Command({
    name: "collab",
    description: "Collab-related commands",
    options: [{
        name: "info",
        description: "Info about the collab",
        type: "SUB_COMMAND"
    },{
        name: "invite",
        description: "Gives you the collab invite link",
        type: "SUB_COMMAND",
        options: [
            {
                name: "expires_in",
                description: "Set the invite link max age",
                type: "INTEGER",
                minValue: 1800,
                maxValue: 604800,
                choices: [{
                    name: "30 minutes",
                    value: 1800,
                },{
                    name: "1 hour",
                    value: 3600,
                },{
                    name: "6 hours",
                    value: 21600,
                },{
                    name: "12 hours",
                    value: 43200,
                },{
                    name: "1 day",
                    value: 86400,
                },{
                    name: "7 days",
                    value: 604800,
                }],
                autocomplete: false,
                required: false
            },{
                name: "max_uses",
                description: "Specify a max number of uses",
                type: "INTEGER",
                minValue: 1,
                maxValue: 100,
                choices: [{
                    name: "1 use",
                    value: 1
                },{
                    name: "5 uses",
                    value: 5
                },{
                    name: "10 uses",
                    value: 10
                },{
                    name: "25 uses",
                    value: 25
                },{
                    name: "50 uses",
                    value: 50
                },{
                    name: "100 uses",
                    value: 100
                }],
                autocomplete: false,
                required: false
            }
        ]
    }],
    run: async ({ interaction }) => {
        if(interaction.options.getSubcommand() == "info")
        {
            const infoEmbed = new MessageEmbed({
                author: {name: "Marky Alon", iconURL: "https://cdn.discordapp.com/avatars/769801941114683453/1a4f4e0ca7fab2ec997ba7cdebb60502.png", url: "https://www.youtube.com/channel/UCNo9YDZUujsuvMq6p8CLJ9A"},
                color: "LIGHT_GREY",
                title: "About The Imagination Collab",
                description: "The Imagination Collab is an animation collab where you can animate anything you can imagine. This collab is inspired by the FUN collab series!",
                fields: [
                    {
                        name: "Hosted by",
                        value: "<@769801941114683453>",
                        inline: true
                    }
                ]
            });

            interaction.reply({ embeds: [infoEmbed] });
        }
        if(interaction.options.getSubcommand() == "invite")
        {
            const guild = await client.guilds.cache.get("939703629231816724");
            const channel = guild.channels.cache.find(channel => channel.id == "943910607009230908");
            let maxAge;
            if(interaction.options.getInteger("expires_in") == null)
            {
                maxAge = 0;
            } else {
                maxAge = interaction.options.getInteger("expires_in")
            }
            let maxUses;
            if(interaction.options.getInteger("max_uses") == null)
            {
                maxUses = 0;
            } else {
                maxUses = interaction.options.getInteger("max_uses");
            }
            let unique = false;
            if(interaction.options.getInteger("expires_in") !== null || interaction.options.getInteger("max_uses") !== null)
            {
                unique = true;
            }
            (channel as TextChannel).createInvite({
                maxAge: maxAge,
                maxUses: maxUses,
                reason: "User-requested invite",
                unique: unique,
            }).then(async invite => {
                await interaction.reply({ content: `Your invite link is ${invite.url}`, ephemeral: true });
                await interaction.followUp({ content: "Feel free to invite your friends!" , ephemeral: true});
            });
        }
    }
});