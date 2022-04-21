///Get random number
/*Usage*\
$Type: number
@Type: number
└>Number(random from 0 ~ (X-1))
\*/
export function random(x: number) {
    return Math.floor(Math.random() * x);
};