<template>
  <div id="steamAuth">
    <form action="http://macho.ga:8000/steamauth" method="post" v-if="this.$store.state.auth.discordUser && !this.$store.state.auth.steamUser">
      <input name="submit" type="image" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_small.png" alt="Sign-in through Steam">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({}),
  created() {
    const id = window.localStorage.getItem('steamId')
    const user = window.localStorage.getItem('steamUser')
    if (id && user) {
      this.$store.commit('setSteamId', id)
      this.$store.commit('setSteamUser', JSON.parse(user))
      this.$store.commit('setSteamAuthenticated', true)
    } else if (id) {
      this.fetchUser()
    } else if (
      !this.$store.state.auth.steamId &&
      !this.$store.state.auth.steamUser &&
      this.$route.query.steamid
    ) {
      this.$store.commit('setSteamId', this.$route.query.steamid)
      this.fetchUser()
    }
  },
  methods: {
    unlink() {
      window.localStorage.removeItem('steamId')
      window.localStorage.removeItem('steamUser')
      this.$store.commit('setSteamAuthenticated', false)
      this.$store.commit('setSteamId', null)
      this.$store.commit('setSteamUser', null)
    },
    async fetchUser() {
      const response = await axios.get(
        `http://macho.ga:8000/steamauth/id/${window.localStorage.steamId ||
          this.$store.state.auth.steamId}`
      )
      const apiUser = await axios.get(
        `http://macho.ga:8000/users/${this.$store.state.auth.discordUser.id}`
      )
      const json = response.data

      console.log('Fetched user')
      
      if (apiUser.data.steamid == this.$store.state.auth.steamId || apiUser.data.steamid == '') {
        console.log('User is already linked.')
        this.$store.commit('setSteamUser', json)
        window.localStorage.setItem('steamUser', JSON.stringify(json))
        window.localStorage.setItem('steamId', json.steamid)
        if (window.location.toString().includes('macho')) {
          window.location = 'http://www.macho.ga'
        } else if (window.location.toString().includes('localhost')) {
          window.location = 'http://localhost:8080'
        }
        return true
      } else {
        console.log(
          `${apiUser.data.steamid} != ${this.$store.state.auth.steamId}`
        )
      }
      const linkRes = await axios.post(
        `http://macho.ga:8000/steamauth/link?discordId=${
          this.$store.state.auth.discordUser.id
        }&steamId=${json.steamid}&jwt=${window.localStorage.jwt ||
          this.$store.state.auth.jwt}`
      )

      console.log(linkRes.data)

      if (linkRes.data !== 'Successful') {
        this.$store.commit('setSteamId', null)
        this.$store.commit('setSteamAuthenticated', false)
        window.localStorage.removeItem('steamId')
        console.log('Error')
        if (window.location.toString().includes('macho')) {
          window.location = 'http://www.macho.ga'
        } else if (window.location.toString().includes('localhost')) {
          window.location = 'http://localhost:8080'
        }
        return false
      }
      console.log(linkRes.data)
      this.$store.commit('setSteamUser', json)
      window.localStorage.setItem('steamUser', JSON.stringify(json))
      window.localStorage.setItem('steamId', json.steamid)
      console.log('Linked account')
      if (window.location.toString().includes('macho')) {
        window.location = 'http://www.macho.ga'
      } else if (window.location.toString().includes('localhost')) {
        window.location = 'http://localhost:8080'
      }
    }
  }
}
</script>
