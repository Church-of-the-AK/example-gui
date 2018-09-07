<template>
  <div id="discordAuth">
    <v-btn style="background-color:#8aa1fc" v-if="!this.$store.state.auth.discordAuthenticated" @click="login()"><i class="fab fa-discord"/>&nbsp;<span>Log in with Discord</span></v-btn>
    <span v-if="this.$store.state.auth.discordUser">Hello there, {{this.$store.state.auth.discordUser.username}}!</span>
    <v-btn style="background-color:#8aa1fc" to="/profile" v-if="this.$store.state.auth.discordUser" id="selfButton"><v-icon>person</v-icon> <span>Profile</span></v-btn>
    <v-btn style="background-color:#8aa1fc" v-on:click="logout()" v-if="this.$store.state.auth.discordAuthenticated"><i class="fas fa-sign-out-alt"/>&nbsp;<span>Logout</span></v-btn>
  </div>
</template>

<script>
import axios from 'axios'
const CLIENT_ID = '399794061059424257'
var redirect
if (window.location.toString().includes('macho')) {
  redirect = encodeURIComponent('http://www.macho.ninja/')
} else if (window.location.toString().includes('localhost')) {
  redirect = encodeURIComponent('http://localhost:8080/')
}

export default {
  data: () => ({
  }),
  created () {
    const token = window.localStorage.getItem('discordToken')
    const user = window.localStorage.getItem('discordUser')

    if (token && user) {
      this.$store.commit('setDiscordToken', token)
      this.$store.commit('setDiscordUser', JSON.parse(user))
      this.$store.commit('setDiscordAuthenticated', true)
    } else if (token) {
      this.fetchUser()
    } else if (!this.$store.state.auth.discordAccessToken && !this.$store.state.auth.discordUser && this.$route.query.code) {
      this.$store.commit('setDiscordCode', this.$route.query.code)
      this.fetchToken()
    }
  },
  methods: {
    login () {
      window.location = `https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
    },
    logout () {
      window.localStorage.clear()
      this.$store.commit('setDiscordAuthenticated', false)
      this.$store.commit('setDiscordCode', null)
      this.$store.commit('setDiscordToken', null)
      this.$store.commit('setDiscordUser', null)
      this.$store.commit('setSteamUser', null)
      this.$store.commit('setSteamAuthenticated', false)
      this.$store.commit('setSteamId', null)
      this.$store.commit('setJWT', null)
    },
    async fetchToken () {
      const response = await axios.get(`http://macho.ninja:8000/discordauth?code=${this.$store.state.auth.discordCode}&redirect=${redirect}`)
      const json = response.data
      this.$store.commit('setDiscordToken', json[0].access_token)
      this.$store.commit('setJWT', json[1].jwt)
      this.$store.commit('setDiscordAuthenticated', true)
      window.localStorage.setItem('discordToken', this.$store.state.auth.discordAccessToken)
      window.localStorage.setItem('jwt', this.$store.state.auth.jwt)
      this.fetchUser()
    },
    async fetchUser () {
      const response = await axios.get('https://discordapp.com/api/users/@me', {headers: {Authorization: `Bearer ${this.$store.state.auth.discordAccessToken}`}})
      const json = response.data
      this.$store.commit('setDiscordUser', json)
      window.localStorage.setItem('discordUser', JSON.stringify(this.$store.state.auth.discordUser))
      const {data: apiUser} = await axios.get(`http://macho.ninja:8000/users/${json.id}`)

      if (apiUser.links.steamId !== '') {
        window.localStorage.setItem('steamId', apiUser.links.steamId)
        this.$store.commit('setSteamId', apiUser.links.steamId)
        const { data: steamUser } = await axios.get(`http://macho.ninja:8000/steamauth/id/${window.localStorage.steamId || this.$store.state.auth.steamId}`)

        this.$store.commit('setSteamUser', steamUser)
        window.localStorage.setItem('steamUser', JSON.stringify(steamUser))
      }

      if (window.location.toString().includes('macho')) {
        window.location = 'http://www.macho.ninja'
      } else if (window.location.toString().includes('localhost')) {
        window.location = 'http://localhost:8080'
      }
    }
  }
}
</script>

<style>
</style>
