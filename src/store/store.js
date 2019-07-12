import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
        state: {
            loding: true
        },
        mutations: {
            loding(a, b) {
                this.state.loding = b
                    // console.log(b)
            }
        }
    }) // 这里你可能已经有其他 module



export default store;