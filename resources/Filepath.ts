import { path } from './functions/.export.functions';

export const Filepath = {
    commandsDir: path.join(__dirname, "..", "commands"),
    featuresDir: path.join(__dirname, "..", "features"),
    urlData: path.join(__dirname, "urlData.json"),
    packagejson: path.join(__dirname, "..", "package.json"),
};