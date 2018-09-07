<template>
  <div id='chips'>
    <v-avatar
      :tile="false"
      size="70"
      color="grey lighten-4"
      v-if="this.$store.state.auth.discordUser && this.$store.state.auth.discordUser.avatar"
    >
      <img :src="'https://cdn.discordapp.com/avatars/' + this.$store.state.auth.discordUser.id + '/' + this.$store.state.auth.discordUser.avatar + '.png'" />
    </v-avatar>
    <!-- <p v-if="!this.$store.state.site.desktop && !apiStatus()">The Macho API seems to be down, currently. How sad, nothing will work.</p> -->
    <v-container grid-list-xl>
    <v-flex>
      <v-chip label outline color="green">Welcome to the official Macho GUI! This website is mostly for people that cannot/don't want to read the JSON on the official&nbsp;<a href="http://macho.ninja:8000/users" target="_blank" rel="noopener">Macho API</a>.</v-chip>
    </v-flex>
    <!-- <v-flex>
      <v-chip label outline color="red" v-if="this.$store.state.site.desktop && !apiStatus()">The Macho API seems to be down, currently. How sad, nothing will work.</v-chip>
    </v-flex> -->
  </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    apiStatus () {
      try {
        axios.get('http://macho.ninja:8000/users').then(response => {
          return true
        })
      } catch (err) {
        return false
      }
    }
  }
}
</script>
