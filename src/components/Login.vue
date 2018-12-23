<script>
import { auth, db } from '@/firebase.js';

export default {
    props: ['dialog'],
    data() {
        return {
            email: '',
            password: ''
        };
    },
    computed: {
        show: {
            set(value) {
                return this.$emit('update:dialog', value);
            },
            get() {
                return this.dialog;
            }
        }
    },
    methods: {
        login() {
            auth.signInWithEmailAndPassword(this.email, this.password)
                .then(res => db.ref('userList/' + res.user.uid).once('value'))
                .then(snapshot => {
                    this.show = false;
                    const userData = {
                        id: snapshot.key,
                        ...snapshot.val()
                    };
                    this.$store.commit('setUser', userData);
                })
                .catch(error => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === 'auth/wrong-password') {
                        alert('Wrong password.');
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        }
    }
};
</script>

<template>
  <v-dialog max-width="350" v-model="show">
    <v-card>
      <v-card-title class="headline">
        <v-icon class="secondary--text">fa fa-user-circle</v-icon>
        <span class="ml-2">Login</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field color="secondary" label="E-mail" type="email" v-model="email"></v-text-field>
        <v-text-field color="secondary" label="Password" type="password" v-model="password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="login" color="secondary">登入</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
