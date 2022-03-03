import { TextChannel } from "discord.js";
import { Command } from "../../structures/Command";
import { Purge } from "../../structures/ModerationUtils";

export default new Command({
    userPermissions: ["MANAGE_MESSAGES"],
    name: "purge",
    description: "Bulk delete messages",
    options: [{
        name: "amount",
        description: "Amount of messages to delete",
        type: "INTEGER",
        required: true,
        minValue: 1
    }],
    run: async ({ interaction }) => {
        // const channel = (interaction.channel as TextChannel);
        // const amount = interaction.options.getInteger("amount");
        // const msgContent: string = `Successfully purged ${amount} messages in ${channel}!`;
        
        // if(amount <= 100) 
        // {
        //     channel.bulkDelete(100);
        //     interaction.reply({ content: msgContent, ephemeral: true });
        // } else {
        //     const fullAmount = Math.floor(amount / 100);
        //     const leftAmount = amount % 100;
        //     let interval, intervalTime = 2000,i = 0;

        //     interaction.reply({ content: `Purging ${amount} messages in ${channel}...`, ephemeral: true });

        //     function massivePurge()
        //     {
        //         console.log(`Purging... ${i+1}`);
        //         channel.bulkDelete(100);
        //         if((i + 1) < fullAmount) 
        //         {
        //             i++;
        //         } else {
        //             clearInterval(interval);
        //             setTimeout(() => {
        //                 console.log(`Purging... ${fullAmount + 1}`);
        //                 channel.bulkDelete(leftAmount);
        //                 interaction.followUp({ content: msgContent, ephemeral: true });
        //             }, intervalTime);
                    
        //             return;
        //         }
        //     }
        //     interval = setInterval(massivePurge, intervalTime);
            
        // };


        const purge: Purge = new Purge({
            guild: interaction.guild,
            channel: interaction.channel as TextChannel,
            amount: interaction.options.getInteger("amount")
        });




        
    }
});