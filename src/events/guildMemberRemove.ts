import { MessageEmbed, TextChannel } from "discord.js";
import { Event } from "../structures/Event";
import { client } from "..";

export default new Event("guildMemberAdd", async (member) => {
    const guild = await client.guilds.cache.get("939703629231816724");
    const channel = guild.channels.cache.find(channel => channel.id == "943910607009230908");
    const embed = new MessageEmbed({
        author: {iconURL: "https://cdn.discordapp.com/icons/939703629231816724/fd6f6af30de690ae8656cba1672de837.png"},
        color: "LIGHT_GREY",
        title: `Goodbye, ${member.user.tag}!`,
        description: "We will miss you!",
        fields: [{
            name: `After ${member.user.tag} left,`,
            value: `we have ${guild.memberCount} members!`
        }]
    });
    
    
    (channel as TextChannel).send({ embeds: [ embed ] });
});