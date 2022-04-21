import { Filepath } from '../Filepath';
import { fs, similar } from './.export.function';


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
        let status = new String;
        let value = new Array;
        let each = url.split("/").slice(2, url.length).join(".").split(".");

        dangerWord.forEach((ele: string, index: any) => {
            if (Number(similar(ele, hostname, 1)) >= 50.0) {
                status = 'relatedDangerWord';
                value.push([similar(ele, hostname, 1), index, ele]);
            }
            else if (each.some(ele_ => ele_ == ele)) {
                status = 'containDangerWord';
                value.push(["contain", index, ele]);
            };
        });

        if (dangerWord.includes(hostname)) {
            value = new Array;

        }
        else if (shortURL.includes(hostname)) {
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
            case 'similarHost': //Warning
                level.push(3);
                reason.push(result.value);
                break;
            case 'shortURL': //Short URL
                level.push(2);
                reason.push(result.value);
                break;
            case 'safeHost': //OK
                level.push(1);
                reason.push(result.value);
                break;
            case 'relatedDangerWord': //Similar to Dangerous Word
                level.push(4);
                reason.push(result.value);
                break;
            case 'containDangerWord': //Contain Dangerous Word
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