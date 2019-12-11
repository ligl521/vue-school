import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
        state: {
          loding: true,
          websiteNewsId:'',
          isEd:0,
        },
        mutations: {
            loding(a, b) {
                this.state.loding = b
                    // console.log(b)
            },
            changeWebsiteNewsId( state, msg ){
              state.websiteNewsId = msg;
            },
            changeis(state,n){
              state.isEd=n
              // console.log(state.isEd++)
            }
        }
    }) // 这里你可能已经有其他 module



export default store;
