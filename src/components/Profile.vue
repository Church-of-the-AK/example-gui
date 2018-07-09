<template>
  <v-app id='inspire' dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <buttons />
            <h2>Linked Accounts</h2>
            <v-list>
              <v-list-tile avatar v-if='this.$store.state.auth.steamAuthenticated'>
                <v-list-tile-avatar>
                  <i class='fab fa-steam'></i>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Steam</v-list-tile-title>
                  <v-list-tile-sub-title>{{ this.$store.state.auth.steamUser.personaname }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn v-on:click='unlinkSteam()'>
                    <i class='fas fa-sign-out-alt'/>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
            <div id='profile'>
            </div>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot='activator' href='https://github.com/jasonhaxstuff/machogui' icon large target='_blank'>
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <customFooter></customFooter>
  </v-app>
</template>

<script>
import axios from 'axios'
import NavigationDrawer from './NavigationDrawer.vue'
import Footer from './Footer.vue'
import Chips from './Chips.vue'
import Buttons from './Buttons.vue'
export default {
  components: {
    navigationDrawer: NavigationDrawer,
    customFooter: Footer,
    chips: Chips,
    buttons: Buttons
  },
  data: () => ({}),
  created () {
    const token = window.localStorage.getItem('discordToken')
    const user = window.localStorage.getItem('discordUser')
    if (token && user) {
      this.$store.commit('setDiscordToken', token)
      this.$store.commit('setDiscordUser', JSON.parse(user))
      this.$store.commit('setDiscordAuthenticated', true)
    }
    this.loadUserInfo(this.$store.state.auth.discordUser.id)
  },
  methods: {
    unlinkSteam () {
      axios.post(`http://macho.ga:8000/steamauth/link?discordId=${this.$store.state.auth.discordUser.id}&steamId=null&jwt=${window.localStorage.jwt || this.$store.state.auth.jwt}`)
      window.localStorage.removeItem('steamId')
      window.localStorage.removeItem('steamUser')
      this.$store.commit('setSteamAuthenticated', false)
      this.$store.commit('setSteamId', null)
      this.$store.commit('setSteamUser', null)
    },
    loadUserInfo: function (id) {
      axios.get(`http://192.243.102.112:8000/users/${id}`).then(response => {
        let div = document.getElementById('profile')
        div.innerHTML = `
        <hr>
        <table style='margin:auto' class='highlight centered'>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>Date created</td>
          <td>${response.data.datecreated}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>${response.data.id}</td>
        </tr>
        <tr>
          <td>Avatar</td>
          <td><img src='${response.data.avatarurl}' height='64' width='64'></td>
        </tr>
        <tr>
          <td>Banned</td>
          <td>${response.data.banned}</td>
        </tr>
        <tr>
          <td>Date of last message</td>
          <td>${response.data.datelastmessage}</td>
        </tr>
        <tr>
          <td>Steam ID</td>
          <td>${response.data.steamid}</td>
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
          <td>${response.data.balance.networth}</td>
        </tr>
        <tr>
          <td>Last claimed dailies</td>
          <td>${response.data.balance.dateclaimeddailies}</td>
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
