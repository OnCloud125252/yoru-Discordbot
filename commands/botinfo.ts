import { ICommand } from 'wokcommands';
import * as func from '../resources/functions/.export.functions';
import info from '../resources/info';


export default {
    category: 'bot',
    description: 'show info about bot',

    callback: ({ message, client }) => {
        let msg = String();
        switch (func.random(2)) {
            case 0:
                msg = '看到這行的人可以獲得一塊餅乾 ฅ ^• ω •^ ฅ';
                break;
            case 1:
                msg = '看到這行的人可以獲得一罐雪碧 ฅ ^• ω •^ ฅ';
                break;
        };
        message.channel.send(msg).then(resultMessage => {
            let networkLatency = (resultMessage.createdTimestamp - message.createdTimestamp);
            let apiLatency = client.ws.ping;
            let latency = networkLatency + apiLatency;
            let emoji: string;
            let emojitext: string;

            switch (true) {
                case (latency < 100):
                    emoji = ":laughing:";
                    emojitext = "Very good !";
                    break;
                case (latency < 500):
                    emoji = ":confused:";
                    emojitext = "Uh, A bit laggy ...";
                    break;
                case (latency < 1000):
                    emoji = ":confounded:";
                    emojitext = "It looks like we have a bad network connection ...";
                    break;
                default:
                    emoji = ":exploding_head:";
                    emojitext = "Oh my, it looks terrible !\n***Are you on the moon ?***";
                    break;
            };

            message.reply({
                embeds: [{
                    color: '#4169e1',
                    title: 'Bot info',
                    fields: [
                        {
                            name: `**Login Platform :**`,
                            value: `\`${info.release.platform}\``,
                            inline: true
                        },
                        {
                            name: `API Latency :`,
                            value: `\`${apiLatency} ms\``,
                            inline: true
                        },
                        {
                            name: `Network Latency :`,
                            value: `\`${networkLatency} ms\``,
                            inline: true
                        },
                        {
                            name: `Rate : ${emoji}`,
                            value: emojitext,
                            inline: false
                        },
                        {
                            name: `Uptime :`,
                            value: `\`${func.prettyMS(Number(client.uptime), { verbose: true })}\``,
                            inline: false
                        },
                        {
                            name: `Start time :`,
                            value: `\`${func.TWtime().time}\`\n\`${func.TWtime().gmt}\``,
                            inline: true
                        },
                        {
                            name: `Version :`,
                            value: `Bot \`V ${info.release.botVersion}\`\nScam detecter \`V ${info.release.scamdetecterVersion}\``,
                            inline: false
                        }
                    ],
                    footer: {
                        text: `Bot \`V ${info.release.botVersion}\``
                    },
                    timestamp: new Date(),
                }]
            }).then(_ => resultMessage.delete());
        });
    }
} as ICommand;