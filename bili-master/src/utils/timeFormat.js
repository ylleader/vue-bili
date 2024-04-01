export default function (t = 0, h = true, m = true, s = true) {
    let hour = Math.floor(t / 3600)
    let minute = Math.floor(t / 60) - hour * 60
    let second = t - (hour * 60 + minute) * 60

    minute >= 10 || (minute = '0' + minute)
    second >= 10 || (second = '0' + second)
    if (h === 'random') {
        return `${hour || ''}${hour ? ':' : ''}${minute}:${second}`
    } else {
        return `${h ? hour + ':' : ''}${m ? minute + ':' : ''}${s ? second : ''}`
    }
}