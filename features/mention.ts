import { Client } from 'discord.js';
import info from '../resources/info';


export default (client: Client) => {
    client.on('messageCreate', (message) => {
        if (message.mentions.users.has("910897168615895050")) {
            message.reply({
                embeds: [
                    {
                        color: "#4169e1",
                        title: "Hello, I'm yoru !",
                        fields: [
                            {
                                name: "Prefix",
                                value: `\`${info.release.prefix}\``
                            }
                        ],
                        footer: {
                            text: `Bot \`V ${info.release.botVersion}\``
                        },
                        timestamp: new Date(),
                    }
                ]
            });
        };
    });
};

export const config = {
    // The display name that server owners will see.
    // This can be changed at any time.
    displayName: "mentions",

    // The name the database will use to set if it is enabled or not.
    // This should NEVER be changed once set, and users cannot see it.
    dbName: "null"
};