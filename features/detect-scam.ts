import { Client } from 'discord.js';
import * as func from "../resources/functions/.export.function";


export default (client: Client) => {
    client.on('messageCreate', (message) => {
        if (message.content.includes("http")) {
            var link = func.findUrl(message.content);
            if (link) {
                let result = func.checkLink(link);
                let resultEmbed = {
                    color: 0x00ff00,
                    fields: Array(),
                    timestamp: func.TWtime().full,
                    footer: {
                        text: 'Always be aware of any link !'
                    },
                };
        
                function write(name: string, status: string, value: string) {
                    if (resultEmbed.fields.some((obj: { name: string; }) => obj.name == name)) {
                        let i = NaN;
                        resultEmbed.fields.forEach((obj: { name: string; }, index: number) => {
                            if (obj.name === name) {
                                i = index;
                            };
                        });
                        let prevalue = resultEmbed.fields[i].value;
                        resultEmbed.fields[i].value = `${prevalue}\n${value}`;
                    }
                    else if (!resultEmbed.fields.some((obj: { name: string; }) => obj.name == name)) {
                        resultEmbed.fields.push({
                            name: name,
                            value: `***${status}***\n${value}`,
                            inline: false
                        });
                    }
                }
        
                result.level.forEach((level, index) => {
                    let reason = result.reason[index];
                    let position = index + 1;
                    switch (level) {
                        case 1:
                            reason.forEach((ele: any) => {
                                write(`Link number ${position} :`, `SAFE !`, `\`${ele[2]}\``);
                            });
                            break;
                        case 2:
                            reason.forEach((ele: any) => {
                                write(`Link number ${position} :`, `CAUTION: is a short link !`, `\`${ele[2]}\``);
                                resultEmbed.color = 0xffff00;
                            });
                            break;
                        case 3:
                            reason.forEach((ele: any) => {
                                write(`Link number ${position} :`, `WARNING: might be scam !`, `\`${ele[0]}\` similar to \`${ele[2]}\``);
                                resultEmbed.color = 0xff0000;
                            });
                            break;
                        case 4:
                            reason.forEach((ele: any) => {
                                write(`Link number ${position} :`, `WARNING: might be scam !`, `\`${ele[0]}\` related to \`${ele[2]}\``);
                                resultEmbed.color = 0xff0000;
                            });
                            break;
                        case 5:
                            reason.forEach((ele: any) => {
                                write(`Link number ${position} :`, `CAUTION: contain dangerous word !`, `\`${ele[2]}\``);
                                resultEmbed.color = 0xffff00;
                            });
                            break;
                        case 7:
                            write(`Link number ${position} :`, `CAUTION: unknown link !`, `:(`);
                            resultEmbed.color = 0xffff00;
                            break;
                    };
                });
                message.reply({ embeds: [resultEmbed] });
            };
        };
    });
};


export const config = {
    // The display name that server owners will see.
    // This can be changed at any time.
    displayName: "detect-scam",

    // The name the database will use to set if it is enabled or not.
    // This should NEVER be changed once set, and users cannot see it.
    dbName: "nul"
};