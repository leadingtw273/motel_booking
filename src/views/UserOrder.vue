<script>
import dayjs from 'dayjs';
import { db } from '@/firebase.js';

export default {
    name: 'UserProfile',
    data() {
        return {
            roomList: []
        };
    },
    methods: {
        getUserRoomList() {
            return new Promise(resolve => {
                db.ref('userList/' + this.$store.state.userProfile.id).once('value', snapshot => {
                    resolve(snapshot.val().myRoomList || []);
                });
            });
        },
        getRoomData(data) {
            return new Promise(resolve => {
                db.ref('allRoomList').once('value', snapshot => {
                    const list = snapshot.val();
                    const roomDetailList = data.map(item => {
                        return {
                            checkIn: dayjs(Number(item.checkIn)).format('YYYY/MM/DD'),
                            checkOut: dayjs(Number(item.checkOut)).format('YYYY/MM/DD'),
                            ...list[item.room]
                        };
                    });
                    resolve(roomDetailList);
                });
            });
        }
    },
    async mounted() {
        const list = await this.getUserRoomList();
        if (list != null) this.roomList = await this.getRoomData(list);
    }
};
</script>

<template>
  <v-layout justify-center row wrap>
    <v-flex :key="index" ma-2 v-for="(room,index) in roomList" xs9>
      <v-card hover tile>
        <v-layout>
          <v-flex py-0 xs4>
            <v-img
              :src="`https://unsplash.it/200/300?image=${Math.floor(index) + 1}`"
              aspect-ratio="1.5"
              height="200px"
            ></v-img>
          </v-flex>

          <v-flex align-self-center xs8>
            <v-layout row wrap>
              <v-flex xs12>
                <span class="headline">{{room.name}}</span>
              </v-flex>
              <v-flex xs6>
                <v-icon color="secondary">money</v-icon>
                <span class="pl-2">價格 : {{room.money}}</span>
              </v-flex>
              <v-flex xs6>
                <v-icon color="secondary">people</v-icon>
                <span class="pl-2">人數 : {{room.people}}</span>
              </v-flex>
              <v-flex xs6>
                <v-icon color="secondary">touch_app</v-icon>
                <span class="pl-2">入住時間 : {{room.checkIn}} 12:00 PM</span>
              </v-flex>
              <v-flex xs6>
                <v-icon color="secondary">transfer_within_a_station</v-icon>
                <span class="pl-2">退房時間 : {{room.checkOut}} 03:00 PM</span>
              </v-flex>
              <v-flex xs12>
                <v-icon color="secondary">location_on</v-icon>
                <span class="pl-2">地址 : {{room.address}}</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
