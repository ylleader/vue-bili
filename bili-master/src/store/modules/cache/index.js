export default {
    namespaced: true,
    state: {
        caches: []
    },
    actions: {
        add({ commit }, val) {
            commit('ADD', val)
        },
        delete({ commit, val }) {
            commit('DELETE', val)
        },
        deleteAll({ commit }) {
            commit('DELETE_ALL')
        }
    },
    mutations: {
        ADD: (state, val) => {
            if (!state.caches.includes(val)) {
                state.caches.push(val)
            }
        },
        DELETE(state, val) {
            let index = state.caches.indexOf(val)
            if (index !== -1) {
                state.caches.splice(index, 1)
            }
        },
        DELETE_ALL(state) {
            state.caches = []
        }
    }
}