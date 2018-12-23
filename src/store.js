import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userProfile: {
            name: '',
            phone: '',
            email: '',
            address: '',
            id: ''
        }
    },
    mutations: {
        setUser(state, payLoad) {
            state.userProfile.name = payLoad.name;
            state.userProfile.phone = payLoad.phone;
            state.userProfile.email = payLoad.email;
            state.userProfile.address = payLoad.address;
            state.userProfile.id = payLoad.id;
        }
    },
    actions: {}
});
