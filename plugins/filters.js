
import Vue from 'vue'
import dayjs from 'dayjs'

export function transTime(value) {
    return dayjs(+value).format('HH:mm')
}

const filters = {
    transTime
}

export default filters


Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})