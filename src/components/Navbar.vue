<script>
import Login from './Login';
import ProfileDrawer from './ProfileDrawer';

export default {
    components: {
        ProfileDrawer,
        Login
    },
    data() {
        return {
            drawer: false,
            dialog: false
        };
    },
    computed: {
        isLogin() {
            return this.$store.state.userProfile.name;
        }
    },
    methods: {
        isPage(path) {
            return this.$route.path === '/' + path;
        },
        toHome() {
            if (this.isPage('Home')) return;
            this.$router.push({ name: 'home' });
        },
        toOrder() {
            if (this.isPage('Order')) return;
            this.$router.push({ name: 'order' });
        },
        signOut() {
            this.$store.commit('signOutUser');
        }
    }
};
</script>

<template>
  <nav>
    <login :dialog.sync="dialog"></login>

    <v-toolbar app flat>
      <v-toolbar-side-icon @click="drawer = !drawer" class="grey--text" v-show="!drawer && isLogin"></v-toolbar-side-icon>
      <v-toolbar-title @click="toHome" class="text-uppercase" style="cursor: pointer ">
        <span class="font-weight-light">Motel</span>
        <span class="secondary--text">Booking</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="drawer = !drawer" color="accent" flat v-show="isLogin">
        <span>{{isLogin}}</span>
        <v-icon right>fa fa-user-circle</v-icon>
      </v-btn>
      <v-btn @click="toOrder" color="accent" flat v-show="isLogin && !(isPage('Order'))">
        <span>Order</span>
        <v-icon right>fa fa-clipboard-list</v-icon>
      </v-btn>
      <v-btn @click="dialog = true" color="accent" flat v-show="!isLogin">
        <span>Login</span>
        <v-icon right>fa fa-sign-in-alt</v-icon>
      </v-btn>
      <v-btn @click="signOut()" color="accent" flat v-show="isLogin">
        <span>Sign Out</span>
        <v-icon right>fa fa-sign-out-alt</v-icon>
      </v-btn>
    </v-toolbar>

    <profile-drawer :drawer.sync="drawer"></profile-drawer>
  </nav>
</template>
