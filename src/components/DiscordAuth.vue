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
  redirect = encodeURIComponent('http://www.macho.ga/')
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
      const response = await axios.get(`http://192.243.102.112:8000/discordauth?code=${this.$store.state.auth.discordCode}&redirect=${redirect}`)
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
      const apiUserData = await axios.get(`http://192.243.102.112:8000/users/${json.id}`)
      const apiUser = apiUserData.data
      // eslint-disable-next-line
      if (apiUser.steamid != '' && apiUser.steamid != null && apiUser.steamid != 'null' && apiUser.steamid != undefined) {
        window.localStorage.setItem('steamId', apiUser.steamid)
        this.$store.commit('setSteamId', apiUser.steamid)
        const steamUser = await axios.get(`http://macho.ga:8000/steamauth/id/${window.localStorage.steamId || this.$store.state.auth.steamId}`)
        this.$store.commit('setSteamUser', steamUser.data)
      }
      if (window.location.toString().includes('macho')) {
        window.location = 'http://www.macho.ga'
      } else if (window.location.toString().includes('localhost')) {
        window.location = 'http://localhost:8080'
      }
    },
    loadUserInfo (id) {
      document.getElementById(id).setAttribute('style', 'display:initial')
      if (this.$store.state.opened.usersOpen.includes(id)) {
        return true
      }
      if (this.$store.state.opened.usersOpened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:initial')
        this.$store.commit('addUsersOpen', id)
        return true
      }
      this.$store.commit('addUsersOpen', id)
      this.$store.commit('addUsersOpened', id)
      axios.get(`http://macho.ga:8000/users/${id}`).then(response => {
        let div = document.getElementById(response.data.id)
        div.innerHTML = `
        <hr>
        <table style="margin:auto" class="highlight centered">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Date created</td>
          <td>${response.data.dateCreated}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>${response.data.id}</td>
        </tr>
        <tr>
          <td>Avatar</td>
          <td><img src="${response.data.avatarUrl}" height="64" width="64"></td>
        </tr>
        <tr>
          <td>Banned</td>
          <td>${response.data.banned}</td>
        </tr>
        <tr>
          <td>Date of last message</td>
          <td>${response.data.dateLastMessage}</td>
        </tr>
        <tr>
          <td>XP</td>
          <td>${response.data.level.xp}</td>
        </tr>
        <tr>
          <td>Level</td>
          <td>${response.data.level.level}</td>
        </tr>
        <tr>
          <td>Last level up</td>
          <td>${response.data.level.timestamp}</td>
        </tr>
        <tr>
          <td>Balance</td>
          <td>${response.data.balance.balance}</td>
        </tr>
        <tr>
          <td>Net worth</td>
          <td>${response.data.balance.netWorth}</td>
        </tr>
        <tr>
          <td>Last claimed dailies</td>
          <td>${response.data.balance.dateLastClaimedDailies}</td>
        </tr>
        <tr>
          <td>Title</td>
          <td>${response.data.profile.title}</td>
        </tr>
        <tr>
          <td>Bio</td>
          <td>${response.data.profile.bio}</td>
        </tr>
        <tr>
          <td>Background</td>
          <td>${response.data.profile.background}</td>
        </tr>
        <tr>
          <td>Levels enabled</td>
          <td>${response.data.settings.levelsEnabled}</td>
        </tr>
        <tr>
          <td>DMs enabled</td>
          <td>${response.data.settings.directMessagesEnabled}</td>
        </tr>
        <tr>
          <td>DB ID</td>
          <td>${response.data.settings.id}</td>
        </tr>
        </tbody>
        </table>
        <hr>
        `
      })
    }
  }
}
</script>

<style>
</style>
