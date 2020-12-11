
import Vue from 'vue'
import dayjs from 'dayjs'

export function transTime(value) {
    return dayjs(value).format('HH:mm')
}
export function transDate(value) {
    return dayjs(value).format('YYYY-MM-DD')
}
export function transDate2(value) {
    const day = dayjs(value)
    const now = dayjs()
    if (day.isSame(now,'day')) {
        return '今天'
    } else if (day.isSame(now.subtract(1,'day'),'day')) {
        return '昨天'
    } else if (day.isSame(now.add(1,'day'),'day')) {
        return '明天'
    } else {
        // return day.format('YYYY年M月D日')
        return day.format('M月D日')
    }
}
const filters = {
    transTime,
    transDate,
    transDate2
}

export default filters


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})