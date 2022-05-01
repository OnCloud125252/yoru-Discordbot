import { ICommand } from 'wokcommands';
import info from '../resources/info';


export default {
    category: 'invite',
    description: 'show invite link of bot',

    callback: ({ message }) => {
        message.reply({
            embeds: [{
                color: "#4169e1",
                title: "Invite yoru to your server!",
                fields: [
                    {
                        name: `Link below :arrow_down_small:`,
                        value: `[ฅ ^• ω •^ ฅ](https://discord.com/api/oauth2/authorize?client_id=910897168615895050&scope=bot&permissions=8)`
                    },
                ],
                footer: {
                    text: `Bot \`V ${info.release.botVersion}\``
                },
                timestamp: new Date(),
            }]
        });
    }
} as ICommand;