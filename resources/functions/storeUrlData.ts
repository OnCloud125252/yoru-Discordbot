import { Filepath } from '../Filepath';
import { fs } from './.export.functions';


///Stores data in ./urlData.json
/*Usage*\
$Type: string, string
@Type: number
└>Number(0~3)

level
└>0 | unexpected error
└>1 | successfully stored data
└>2 | already have data
└>3 | key not found
\*/
export async function storeUrlData(name: string, data: string) {
    let level = 0;
    let urlData = JSON.parse(Object(fs.readFileSync(Filepath.urlData)));


    //Write data to filepath
    function write(name_: string, data: string) {
        let i = NaN;
        urlData.forEach((obj: { key: string; }, index: number) => {
            if (obj.key === name_) {
                i = index;
            };
        });
        if (urlData[i].data.includes(data)) {
            level = 2;
        }
        else if (!urlData[i].data.includes(data)) {
            urlData[i].data.push(data);
            fs.writeFileSync(Filepath.urlData, JSON.stringify(urlData, null, 4));
            level = 1;
        };
    }

    //Return result
    switch (name) {
        case "shortURL":
            write("shortURL", data);
            break;
        case "trustedHost":
            write("trustedHost", data);
            break;
        case "dangerWord":
            write("dangerWord", data);
            break;
        default:
            level = 3;
            break;
    };

    return level;
};