import { fs } from './functions/.export.functions'; 1
import { Filepath } from './Filepath';

const version = JSON.parse(Object(fs.readFileSync(Filepath.packagejson))).version;

export default {
    release: {
        platform: 'Heroku',
        botVersion: version,
        scamdetecterVersion: "1.0.0",
        prefix: "!"
    },
    dev: {
        platform: 'Terminal',
        botVersion: 'Beta 1.0.0',
        scamdetecterVersion: "1.0.0",
        prefix: "$"
    }
}