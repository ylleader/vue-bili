export default {
    namespaced: true,
    state: {
        next: JSON.parse(localStorage.getItem('automaticContinuousBroadcast')) || false
    },
    actions: {
        setNext({ commit }, val) {
            localStorage.setItem('automaticContinuousBroadcast', JSON.stringify(val))
            commit('SET_NEXT', val)
        }
    },
    mutations: {
        SET_NEXT: (state, val) => {
            state.next = val
        }
    }
}