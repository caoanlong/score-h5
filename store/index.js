export const state = () => {
    return {
        matchNav: 'lol',
        matchStatus: 1
    }
}

export const mutations = {
    setMatchNav(state, value) {
        state.matchNav = value
    },
    setMatchStatus(state, value) {
        state.matchStatus = value
    }
}