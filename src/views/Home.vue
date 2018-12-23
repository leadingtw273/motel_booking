<script>
import { db } from '@/firebase.js';
const ref = db.ref('allRoomList');

export default {
    data() {
        return {
            roomList: []
        };
    },
    mounted() {
        ref.on('value', snapshot => {
            const keys = Object.keys(snapshot.val());
            keys.forEach(key => {
                this.roomList.push(snapshot.val()[key]);
            });
        });
    },
    beforeDestroy() {
        ref.off('value');
    }
};
</script>

<template>
  <v-layout justify-center row wrap>
    <v-flex :key="index" v-for="(room,index) in roomList" xs4>
      <v-card hover>
        <v-img :src="`https://unsplash.it/200/300?image=${Math.floor(index) + 1}`" aspect-ratio="1.5" height="200px"></v-img>
        <v-card-title class="py-2" primary-title>
          <h3 class="headline mb-0">{{room.name}}</h3>
        </v-card-title>
        <v-list class="py-2">
          <v-list-tile>
            <v-layout row wrap>
              <v-flex xs6>
                <v-icon color="secondary">money</v-icon>
                <span class="pl-1">價格 : {{room.money}}</span>
              </v-flex>
              <v-flex xs6>
                <v-icon color="secondary">people</v-icon>
                <span class="pl-1">人數 : {{room.people}}</span>
              </v-flex>
            </v-layout>
          </v-list-tile>
          <v-list-tile>
            <v-layout row wrap>
              <v-flex xs12>
                <v-icon color="secondary">location_on</v-icon>
                <span class="pl-1">地址 : {{room.address}}</span>
              </v-flex>
            </v-layout>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>
