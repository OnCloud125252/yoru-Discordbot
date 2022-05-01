import { ICommand } from 'wokcommands';
import info from '../resources/info';


export default {
    category: 'bot',
    description: 'test if the bot is alive',

    // testOnly: true,

    callback: ({ message, client }) => {
        message.channel.send('Caculating ping . . .').then(resultMessage => {
            let networkLatency = (resultMessage.createdTimestamp - message.createdTimestamp);
            let apiLatency = client.ws.ping;
            message.reply({
                embeds: [{
                    color: '#00FF00',
                    title: '🏓 Pong !',
                    fields: [
                        {
                            name: `API latency :`,
                            value: `\`${apiLatency} ms\``,
                            inline: true
                        },
                        {
                            name: `Network Latency :`,
                            value: `\`${networkLatency} ms\``,
                            inline: true
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