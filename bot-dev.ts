import Discord, { Intents } from 'discord.js';
import Commands from 'wokcommands';
import dotenv from 'dotenv';
import { Filepath } from './resources/Filepath';
import * as func from './resources/functions/.export.function';
import info from './resources/info';


dotenv.config();

const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.login(process.env.DJS_TOKEN);

client.on('ready', async () => {
    console.log("\n");
    console.log("::::::::::::::::::::::::::::::::::::");
    console.log("::                                ::");
    console.log("::   THIS IS THE BETA VERSION !   ::");
    console.log("::                                ::");
    console.log("::::::::::::::::::::::::::::::::::::");
    console.log("\n");
    console.log(`User name :        ${client.user?.tag}!`);
    console.log(`Login platform :   ${info.dev.platform}`);
    console.log(`Time :             ${func.TWtime().full}`);
    console.log(`Version :          V ${info.dev.version}`);
    console.log();
    //console.log(`Codever = ${codever}`);
    console.log();
    console.log("---------------------- Log ----------------------");

    setInterval(() => {
        client.user?.setPresence({
            status: "online",  // online, idle, dnd, invisible
        });
        client.user?.setActivity({
            name: `[${info.dev.prefix}] | ${client.ws.ping}ms`,
            type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING
            url: "https://youtu.be/4hbf3eybAPk"
        })
    }, 1000);

    new Commands(client, {
        commandsDir: Filepath.commandsDir,
        featuresDir: Filepath.featuresDir,

        typeScript: true,
        testServers: ['864375027935608852'],

        /*
        mongoUri: String(process.env.MONGO_URI),
        dbOptions: {
            keepAlive: true
        }
        */
    }).setDefaultPrefix(info.dev.prefix);

    /*
    await mongoose.connect(
        String(process.env.MONGO_URI),
        {
            keepAlive: true
        }
    )
    */
});