<script>
import { db } from '@/firebase.js';

export default {
    name: 'UserProfile',
    data() {
        return {
            myRoomList: [],
            roomList: []
        };
    },
    watch: {
        myRoomList: function() {
            db.ref('allRoomList').once('value', snapshot => {
                const list = snapshot.val();

                this.myRoomList.forEach(item => {
                    console.log(list[item.room]);
                    this.roomList.push(list[item.room]);
                });
            });
        }
    },
    mounted() {
        db.ref('userList/' + this.$store.state.userProfile.id).once('value', snapshot => {
            const list = snapshot.val();
            this.myRoomList = list.myRoomList;
        });
    }
};
</script>

<template>
  <v-layout justify-center row wrap>
    <v-flex :key="index" ma-2 v-for="(room,index) in roomList" xs9>
      <v-card tile>
        <v-layout>
          <v-flex py-0 xs4>
            <v-img
              :src="`https://unsplash.it/200/300?image=${Math.floor(index) + 1}`"
              aspect-ratio="1.5"
              height="200px"
            ></v-img>
          </v-flex>

          <v-flex align-self-center xs8>
            <v-list class="py-0">
              <v-list-tile>
                <v-icon color="secondary">money</v-icon>
                <span class="pl-1">價格 : {{room.money}}</span>
              </v-list-tile>
              <v-list-tile>
                <v-icon color="secondary">people</v-icon>
                <span class="pl-1">人數 : {{room.people}}</span>
              </v-list-tile>
              <v-list-tile>
                <v-icon color="secondary">location_on</v-icon>
                <span class="pl-1">地址 : {{room.address}}</span>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
