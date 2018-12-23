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
    }
};
</script>
