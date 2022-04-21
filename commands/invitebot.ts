import { ICommand } from 'wokcommands';


export default {
    category: 'invite',
    description: 'show invite link of bot',
    testOnly: true,

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
            }]
        });
    }
} as ICommand;