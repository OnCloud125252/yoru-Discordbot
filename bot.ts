import Discord, { Intents } from 'discord.js';
import Commands from 'wokcommands';
import dotenv from 'dotenv';
import { Filepath } from './resources/Filepath';
import * as func from './resources/functions/.export.functions';
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
    console.log("::  THIS IS THE RELEASE VERSION ! ::");
    console.log("::                                ::");
    console.log("::::::::::::::::::::::::::::::::::::");
    console.log("\n");
    console.log(`User name :        ${client.user?.tag}!`);
    console.log(`Login platform :   ${info.release.platform}`);
    console.log(`Time :             ${func.TWtime().full}`);
    console.log(`Version :          V ${info.release.botVersion}`);
    console.log();
    console.log();
    console.log("---------------------- Log ----------------------");

    setInterval(() => {
        client.user?.setPresence({
            status: "online",  // online, idle, dnd, invisible
        });
        client.user?.setActivity({
            name: `[${info.release.prefix}] | ${client.ws.ping}ms | V${info.release.botVersion}`,
            type: "STREAMING", // PLAYING, WATCHING, LISTENING, STREAMING
            url: "https://youtu.be/4hbf3eybAPk"
        })
    }, 1000);

    new Commands(client, {
        commandsDir: Filepath.commandsDir,
        featuresDir: Filepath.featuresDir,

        typeScript: true,
        testServers: ['864375027935608852'],
    }).setDefaultPrefix(info.release.prefix);
});