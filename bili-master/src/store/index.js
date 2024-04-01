import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user'
import cache from './modules/cache'
import custom from './modules/custom'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        custom,
        cache
    }
})