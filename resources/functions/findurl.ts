///Find the URL
/*Usage*\
$Type: string
@Type: array
└>Array(url)
\*/
export function findUrl(text: string) {
    const urlRegex = /(https?:\/\/[^\s?(),]+)/g;
    return text.match(urlRegex);
};