///Get the time in Taiwan
/*Usage*\
$Type: null
@Type: object
└>full: String(time) + ' (GMT+8)'
└>time: String(time)
└>gmt: '(GMT+8)'
└>timeZone: 'Asia/Taipei'
\*/
export function TWtime() {
    let dateObject_TW = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' });
    let TimeString = `${dateObject_TW}`;
    return {
        full: TimeString + ' (GMT+8)',
        time: TimeString,
        gmt: '(GMT+8)',
        timeZone: 'Asia/Taipei'
    }
};