<template>
<div id="navigationDrawer">
  <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/profile" v-if="this.$store.state.auth.discordAuthenticated">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Profile</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/users">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Users</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- <v-list-tile to="/guilds">
          <v-list-tile-action>
            <v-icon>people</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Guilds</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/giveaways">
          <v-list-tile-action>
            <v-icon>card_giftcard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Giveaways</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/referrals">
          <v-list-tile-action>
            <v-icon>arrow_forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Referrals</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Macho GUI</v-toolbar-title>
      <v-spacer></v-spacer>
      <steamAuth />
      <githubAuth />
      <discordAuth />
    </v-toolbar>
</div>
</template>

<script>
import DiscordAuth from './DiscordAuth.vue'
import SteamAuth from './SteamAuth.vue'
import GithubAuth from './GithubAuth.vue'

export default {
  components: {
    'discordAuth': DiscordAuth,
    'steamAuth': SteamAuth,
    'githubAuth': GithubAuth
  },
  data: () => ({
    drawer: false
  }),
  methods: {
    dashboard () {
      if (document.getElementById('usersData').offsetParent !== null) {
        document.getElementById('usersData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('guildsData').offsetParent !== null) {
        document.getElementById('guildsData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('giveawaysData').offsetParent !== null) {
        document.getElementById('giveawaysData').setAttribute('style', 'display:none')
      }
      if (document.getElementById('referralsData').offsetParent !== null) {
        document.getElementById('referralsData').setAttribute('style', 'display:none')
      }
      document.getElementById('usersButton').setAttribute('style', 'background-color:#8aa1fc;display:initial')
      document.getElementById('guildsButton').setAttribute('style', 'background-color:#8aa1fc;display:initial')
      document.getElementById('giveawaysButton').setAttribute('style', 'background-color:#8aa1fc;display:initial')
      document.getElementById('referralsButton').setAttribute('style', 'background-color:#8aa1fc;display:initial')
    },
    users () {
      let users = document.getElementById('usersData')
      if (users) {
        if (!users.offsetParent) {
          this.dashboard()
          users.setAttribute('style', 'display:initial')
        }
        document.getElementById('usersButton').setAttribute('style', 'background-color:#8aa1fc;display:none')
      }
    },
    guilds () {
      let guilds = document.getElementById('guildsData')
      if (guilds) {
        if (!guilds.offsetParent) {
          this.dashboard()
          guilds.setAttribute('style', 'display:initial')
        }
        document.getElementById('guildsButton').setAttribute('style', 'background-color:#8aa1fc;display:none')
      }
    },
    giveaways () {
      let giveaways = document.getElementById('giveawaysData')
      if (giveaways) {
        if (!giveaways.offsetParent) {
          this.dashboard()
          giveaways.setAttribute('style', 'display:initial')
        }
        document.getElementById('giveawaysButton').setAttribute('style', 'background-color:#8aa1fc;display:none')
      }
    },
    referrals () {
      let referrals = document.getElementById('referralsData')
      if (referrals) {
        if (!referrals.offsetParent) {
          this.dashboard()
          referrals.setAttribute('style', 'display:initial')
        }
        document.getElementById('referralsButton').setAttribute('style', 'background-color:#8aa1fc;display:none')
      }
    }
  }
}
</script>

<style>

</style>
