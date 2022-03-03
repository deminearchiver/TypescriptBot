import { ApplicationCommandDataResolvable, Client as DiscordClient, ClientEvents, ClientOptions, Collection } from "discord.js";
import { config } from "dotenv";
import { connect } from "mongoose";
import { CommandType } from "../typings/Command";
import { glob } from "glob";
import { promisify } from "util";
import { RegisterCommandOptions } from "../typings/client";
import { Event } from "./Event";

config();

const globPromise = promisify(glob);

export class Client extends DiscordClient {
    commands: Collection<string, CommandType> = new Collection();
    


    public constructor(options: ClientOptions){
        super(options);
    }
    
    start(token: string, mongoUri: string){
        this.connect(mongoUri);
        this.registerModules();
        this.login(token);
    }

    async importFile(filePath: string){
        return (await import(filePath))?.default;
    }

    async registerCommands({ commands, guildID }: RegisterCommandOptions){
        if(guildID) {
            this.guilds.cache.get(guildID)?.commands.set(commands);
            console.log(`Registering commands to ${guildID}`);
        } else {
            this.application?.commands.set(commands);
            console.log("Registering global commands")
        }
    };

    async registerModules() {
        // Command modules
        
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*/*{.ts,.js}`
        );
        commandFiles.forEach( async filePath => {
            const command: CommandType = await this.importFile(filePath);
            if(!command.name) return;
            console.log(command);
            this.commands.set(command.name, command);
            slashCommands.push(command);
        });

       this.on("ready", () => {
            this.guilds.cache.forEach((guild) => {
                this.registerCommands({
                    commands: slashCommands,
                    guildID: guild.id
                })
            })
        });
       
       this.on("guildCreate", (guild) => {
           this.registerCommands({
               commands: slashCommands,
               guildID: guild.id
           })
       });
  
        // Event modules
        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        );
        eventFiles.forEach(async filePath => {
            const event: Event<keyof ClientEvents> = await this.importFile(filePath);
            this.on(event.event, event.run);
        });
    }

    async connect(mongoUri: string) {
        connect(mongoUri)
            .then(() => console.log("Connected to the database!"))
            .catch(error => console.log(error));
    }

    

}