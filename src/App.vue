<template>
  <v-app class="grey lighten-2">
    <navbar></navbar>

    <v-content>
      <v-container grid-list-lg>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
    name: 'App',
    components: {
        Navbar
    },
    data() {
        return {
            //
        };
    },
    created() {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) this.$store.commit('signInUser', userData);
    }
};
</script>
