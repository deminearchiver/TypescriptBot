import { Guild, TextChannel } from "discord.js";
import { PurgeOptions } from "../typings/moderation";

export class Purge {
    guild: Guild;
    amount: number;
    channel: TextChannel;
    constructor(options: PurgeOptions) {
        this.guild = options.guild,
        this.channel = options.channel,
        this.amount = options.amount

        if(this.amount <= 100) this.purgeDefault(); 
        else this.purgeMassive();

    }
    max: number = 1000;
    
    
    purgeDefault() {
        console.log("normal");
        
    }

    purgeMassive() {
        console.log("massive");
    }

    


}