<script>
import { db } from '@/firebase.js';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            roomList: [],
            roomDialog: false,
            roomTarget: {},
            checkInMenu: false,
            checkInDate: '',
            checkOutMenu: false,
            checkOutDate: ''
        };
    },
    async mounted() {
        this.roomList = await this.getAllRoomList();
    },
    methods: {
        showRoomDialog(index) {
            this.roomTarget = this.roomList[index];
            this.roomDialog = true;
        },
        async bookRoom() {
            let userRoomList = await this.getUserRoomList();
            const targetData = await this.getRoomData();
            if (userRoomList == null) {
                userRoomList = [targetData];
            } else {
                userRoomList.push(targetData);
            }
            this.saveToUserRoomList(userRoomList);
            this.roomDialog = false;
        },
        saveToUserRoomList(data) {
            return new Promise(resolve => {
                const userId = this.$store.state.userProfile.id;
                db.ref('userList/' + userId)
                    .child('myRoomList')
                    .set(data, () => {
                        resolve();
                    });
            });
        },
        getUserRoomList() {
            return new Promise(resolve => {
                const userId = this.$store.state.userProfile.id;
                db.ref('userList/' + userId).once('value', snapshot => {
                    resolve(snapshot.val().myRoomList);
                    console.log(snapshot.val().myRoomList);
                });
            });
        },
        getRoomData() {
            return new Promise(resolve => {
                const bookData = {
                    checkIn: dayjs(this.checkInDate)
                        .valueOf()
                        .toString(),
                    checkOut: dayjs(this.checkOutDate)
                        .valueOf()
                        .toString(),
                    name: this.roomTarget.name,
                    room: this.roomTarget.id
                };

                db.ref('allRoomKeyList')
                    .orderByChild('room')
                    .equalTo(bookData.room)
                    .once('value', snapshot => {
                        const roomKey = Object.keys(snapshot.val())[0];
                        const data = Object.values(snapshot.val())[0];
                        resolve(Object.assign(bookData, data, { roomKey }));
                    });
            });
        },
        getAllRoomList() {
            return new Promise(resolve => {
                db.ref('allRoomList').once('value', snapshot => {
                    const keys = Object.keys(snapshot.val());
                    resolve(keys.map(key => ({ id: key, ...snapshot.val()[key] })));
                });
            });
        }
    }
};
</script>

<template>
  <v-layout justify-center row wrap>
    <v-dialog max-width="350" v-model="roomDialog">
      <v-card>
        <v-card-title class="headline">
          <span class="headline">{{roomTarget.name}}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6>
              <v-icon color="secondary">money</v-icon>
              <span class="pl-2">價格 : {{roomTarget.money}}</span>
            </v-flex>
            <v-flex xs6>
              <v-icon color="secondary">people</v-icon>
              <span class="pl-2">人數 : {{roomTarget.people}}</span>
            </v-flex>
            <v-flex mt-2 xs12>
              <v-icon color="secondary">location_on</v-icon>
              <span class="pl-2">地址 : {{roomTarget.address}}</span>
            </v-flex>
            <v-flex mt-2 xs6>
              <v-menu
                :close-on-content-click="false"
                :nudge-right="35"
                full-width
                lazy
                min-width="290px"
                offset-y
                transition="scale-transition"
                v-model="checkInMenu"
              >
                <v-text-field label="入住日期" prepend-icon="event" readonly slot="activator" v-model="checkInDate"></v-text-field>
                <v-date-picker @input="checkInMenu = false" no-title scrollable v-model="checkInDate"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex mt-2 xs6>
              <v-menu
                :close-on-content-click="false"
                :nudge-right="35"
                full-width
                lazy
                min-width="290px"
                offset-y
                persistent-hint
                transition="scale-transition"
                v-model="checkOutMenu"
              >
                <v-text-field label="退房日期" prepend-icon="event" readonly slot="activator" v-model="checkOutDate"></v-text-field>
                <v-date-picker @input="checkOutMenu = false" no-title scrollable v-model="checkOutDate"></v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="bookRoom()" color="info">確定</v-btn>
          <v-btn @click="roomDialog = false" color="secondary">關閉</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-flex :key="index" v-for="(room,index) in roomList" xs4>
      <v-card @click="showRoomDialog(index)" hover>
        <v-img :src="`https://unsplash.it/200/300?image=${Math.floor(index) + 1}`" aspect-ratio="1.5" height="200px"></v-img>
        <v-card-title class="py-2" primary-title>
          <h3 class="headline mb-0">{{room.name}}</h3>
          <v-spacer></v-spacer>
          <v-btn color="secondary" outline>預定</v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6>
              <v-icon color="secondary">money</v-icon>
              <span class="pl-1">價格 : {{room.money}}</span>
            </v-flex>
            <v-flex xs6>
              <v-icon color="secondary">people</v-icon>
              <span class="pl-1">人數 : {{room.people}}</span>
            </v-flex>
            <v-flex xs12>
              <v-icon color="secondary">location_on</v-icon>
              <span class="pl-1">地址 : {{room.address}}</span>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
