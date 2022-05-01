import { Filepath } from '../Filepath';
import { fs, similar } from './.export.functions';


///Check if the link is scam
/*Usage*\
$Type: array
@Type: object
└>level: [Number(1~5)]
└>reason: [[String(similarity), Number(position), String(hostname)]]

level
└>1 | ok
└>2 | short URL
└>3 | warning
└>4 | dangerous
└>5 | unknown
\*/
export function checkLink(links: string[]) {
    let level = new Array;
    let reason = new Array;

    let urlData = JSON.parse(Object(fs.readFileSync(Filepath.urlData)));
    let shortURL = urlData[0].data;
    let trustedHost = urlData[1].data;
    let dangerWord = urlData[2].data;

    //Compare input with data
    function compare(url: string) {
        let d = new URL(url).hostname.replace(/^www./, '');
        let hostname = (d.indexOf(".") != -1 && !shortURL.includes(d) && !trustedHost.includes(d)) ? d.substring(d.indexOf("."), 0) : d;
        let each = url.split("/").slice(2, url.length).join(".").split(".");
        let status = new String;
        let value = new Array;

        dangerWord.forEach((ele: string, index: any) => {
            if (Number(similar(ele, hostname, 1)) >= 50.0) {
                status = 'hostRelatedDangerWord';
                value.push([similar(ele, hostname, 1), index, ele]);
            }
            else if (each.some((ele_: string) => Number(similar(ele, ele_, 1)) >= 50.0)) {
                status = 'relatedDangerWord';
                each.forEach((ele_: string) => {
                    if (Number(similar(ele, ele_, 1)) >= 50.0) {
                        value.push([similar(ele, ele_, 1), index, ele]);
                    };
                });
            };
        });

        if (shortURL.includes(hostname)) {
            value = new Array;
            status = 'shortURL';
            value.push(['100', shortURL.indexOf(hostname), hostname]);
        }
        else if (trustedHost.includes(hostname)) {
            value = new Array;
            status = 'safeHost';
            value.push(['100', trustedHost.indexOf(hostname), hostname]);
        }
        else if (trustedHost.some((ele: string) => (Number(similar(ele, hostname, 1)) >= 50.0))) {
            value = new Array;
            trustedHost.forEach((ele: string, index: any) => {
                if (Number(similar(ele, hostname, 1)) >= 50.0) {
                    status = 'similarHost';
                    value.push([similar(ele, hostname, 1), index, ele]);
                };
            });
        };

        return {
            status: status,
            value: value
        };
    };

    //Return result
    links.forEach(url => {
        let result = compare(url);
        switch (result.status) {
            //Do not change the position!
            case 'similarHost': //Similar hostname
                level.push(3);
                reason.push(result.value);
                break;
            case 'shortURL': //Short URL
                level.push(2);
                reason.push(result.value);
                break;
            case 'safeHost': //Safe
                level.push(1);
                reason.push(result.value);
                break;
            case 'relatedDangerWord': //Similar to dangerous word
                level.push(4);
                reason.push(result.value);
                break;
            case 'hostRelatedDangerWord': //Host related to dangerous word
                level.push(5);
                reason.push(result.value);
                break;
            /**\ 
            case (API): //Dangerous
                level.push(5);
                break;
            \**/
            default: //Unknown
                level.push(7);
                reason.push('7');
                break;
        };
    });

    return {
        level: level,
        reason: reason
    };
};