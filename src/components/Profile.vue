<template>
  <v-app id='inspire' dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <buttons />
            <v-btn large style="background-color:#8aa1fc" @click="claimDailies()" id='dailiesButton'><v-icon>attach_money</v-icon> <span>Claim Dailies</span></v-btn>
            <div id="dailiesResult"></div>
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

              <v-list-tile avatar v-if='this.$store.state.auth.githubAuthenticated'>
                <v-list-tile-avatar>
                  <i class='fab fa-github'></i>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>GitHub</v-list-tile-title>
                  <v-list-tile-sub-title>{{ this.$store.state.auth.githubUser.login }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn v-on:click='unlinkGithub()'>
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
              <v-btn slot='activator' href='https://github.com/machobot/gui' icon large target='_blank' rel="noopener">
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

const CLIENT_ID = '399794061059424257'
let redirect

if (window.location.toString().includes('macho')) {
  redirect = encodeURIComponent('https://www.macho.ninja/')
} else if (window.location.toString().includes('localhost')) {
  redirect = encodeURIComponent('https://localhost:8080/')
}

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

    const github = window.localStorage.getItem('githubId')
    const githubUser = window.localStorage.getItem('githubUser')

    if (github && githubUser) {
      this.$store.commit('setGithubId', github)
      this.$store.commit('setGithubUser', JSON.parse(githubUser))
      this.$store.commit('setGithubAuthenticated', true)
    }

    this.loadUserInfo(this.$store.state.auth.discordUser.id)
  },
  methods: {
    unlinkSteam () {
      axios.post(`https://www.macho.ninja/api/steamauth/link?discordId=${this.$store.state.auth.discordUser.id}&steamId&jwt=${window.localStorage.jwt || this.$store.state.auth.jwt}`)
      window.localStorage.removeItem('steamId')
      window.localStorage.removeItem('steamUser')
      this.$store.commit('setSteamAuthenticated', false)
      this.$store.commit('setSteamId', null)
      this.$store.commit('setSteamUser', null)
    },
    unlinkGithub () {
      axios.post(`https://www.macho.ninja/api/githubauth/link?discordId=${this.$store.state.auth.discordUser.id}&githubId&jwt=${window.localStorage.jwt || this.$store.state.auth.jwt}`)
      window.localStorage.removeItem('githubId')
      window.localStorage.removeItem('githubUser')
      this.$store.commit('setGithubAuthenticated', false)
      this.$store.commit('setGithubId', null)
      this.$store.commit('setGithubUser', null)
    },
    async claimDailies () {
      const { data: response } = await axios.post(`https://www.macho.ninja/api/actions/dailies?jwt=${window.localStorage.getItem('jwt') || this.$store.state.auth.jwt}`)
      const result = document.getElementById('dailiesResult')

      console.log(response)

      if (response.error) {
        if (response.error === 'time') {
          result.innerHTML = `Error: Please wait for another ${response.hoursLeft.toFixed(2)} hours.`
          return
        }

        if (response.error === 'token') {
          window.localStorage.clear()
          this.$store.commit('setDiscordAuthenticated', false)
          this.$store.commit('setDiscordCode', null)
          this.$store.commit('setDiscordToken', null)
          this.$store.commit('setDiscordUser', null)
          this.$store.commit('setSteamUser', null)
          this.$store.commit('setSteamAuthenticated', false)
          this.$store.commit('setSteamId', null)
          this.$store.commit('setJWT', null)

          window.location = `https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}`
          return
        }

        result.innerHTML = `Error: ${response.error}`
        return
      }

      result.innerHTML = `Success! Your balance is now ${response.balance}`
    },
    loadUserInfo: function (id) {
      axios.get(`https://www.macho.ninja/api/users/${id}`).then(response => {
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
          <td>${response.data.dateCreated}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>${response.data.id}</td>
        </tr>
        <tr>
          <td>Avatar</td>
          <td><img src='${response.data.avatarUrl}' height='64' width='64'></td>
        </tr>
        <tr>
          <td>Banned</td>
          <td>${response.data.banned}</td>
        </tr>
        <tr>
          <td>Admin</td>
          <td>${response.data.admin}</td>
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
          <td>${response.data.balance.dateClaimedDailies}</td>
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
