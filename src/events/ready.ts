import { config } from "dotenv";
import mongoose from "mongoose";
import { Event } from "../structures/Event";

config();


export default new Event("ready", async (client) => {
    
    const guild = await client.guilds.cache.get("939703629231816724");
    
    function watchingParticipants() {
        guild.roles.fetch("943532682011353168").then(role => {
            client.user.setActivity({
                name: `over ${role.members.size} collab participants`,
                type: "WATCHING"
            });
        });
        
       
        
    }
    watchingParticipants();
    setInterval(() => watchingParticipants(), 10000)
    
    console.log(`${client.user.tag} is online!`);
})
        
        
        
        
    
      