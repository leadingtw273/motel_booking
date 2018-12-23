<script>
export default {
    props: ['drawer'],
    computed: {
        show: {
            get() {
                return this.drawer;
            },
            set(val) {
                this.$emit('update:drawer', val);
            }
        },
        name() {
            return this.$store.state.userProfile.name;
        },
        phone() {
            return this.$store.state.userProfile.phone;
        },
        email() {
            return this.$store.state.userProfile.email;
        },
        address() {
            return this.$store.state.userProfile.address;
        }
    }
};
</script>

<template>
  <v-navigation-drawer app class="primary" v-model="show">
    <v-img height="250px" src="https://picsum.photos/250/?random">
      <v-layout column fill-height>
        <v-card-title>
          <v-btn @click="show = !show" dark icon>
            <v-icon>chevron_left</v-icon>
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn class="mr-3" dark icon>
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-title>

        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-5 pt-5">
          <div class="display-1 pt-5">{{name}}</div>
        </v-card-title>
      </v-layout>
    </v-img>
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="secondary">phone</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{phone}}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider inset></v-divider>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="secondary">mail</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{email}}</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-divider inset></v-divider>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon color="secondary">location_on</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{address}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
