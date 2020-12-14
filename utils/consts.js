export const NAVS = [
    { id: 'csgo', name: 'CS:GO' },
    { id: 'dota', name: 'DOTA2' },
    { id: 'lol', name: '英雄联盟' },
    { id: 'kog', name: '王者荣耀' }
]
export const NAVS_MAP = Object.fromEntries(NAVS.map(item => [item.id, item.name]))

export const NAV_HEIGHT = 46


export const TOURNAMENT_STAUS = [
    { id: 1, name: '未开始' },
    { id: 2, name: '进行中' },
    { id: 3, name: '已结束' }
]
export const TOURNAMENT_STAUS_MAP = Object.fromEntries(TOURNAMENT_STAUS.map(item => [item.id, item.name]))