import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const localStoragePlugin = store => {
    store.subscribe((mutation, { userProfile }) => {
        // 當執行 setUserData 時才執行以下程式碼
        if (mutation.type === 'signInUser') {
            window.localStorage.setItem('user', JSON.stringify(userProfile));
        }
        if (mutation.type === 'signOut') {
            window.localStorage.removeItem('user');
        }
    });
};

export default new Vuex.Store({
    plugins: [localStoragePlugin],
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
        signInUser(state, payLoad) {
            state.userProfile.name = payLoad.name;
            state.userProfile.phone = payLoad.phone;
            state.userProfile.email = payLoad.email;
            state.userProfile.address = payLoad.address;
            state.userProfile.id = payLoad.id;
        },
        signOutUser(state) {
            state.userProfile.name = '';
            state.userProfile.phone = '';
            state.userProfile.email = '';
            state.userProfile.address = '';
            state.userProfile.id = '';
        }
    },
    actions: {}
});
