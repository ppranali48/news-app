import { createStore } from 'vuex'

export default createStore({
    state: {
       newsDetails: {}
      },
    mutations: {
        addnewsDetails(state, details) {
                state.newsDetails = details;
        }
    },
    actions: {
    
    },
    getters: {
        newsDetails (state) {
            // state variable contains our state data
            return state.newsDetails;
        }
    }
    
})