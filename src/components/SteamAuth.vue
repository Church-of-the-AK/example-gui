<template>
  <div id="steamAuth">
    <form action="https://www.macho.ninja:8000/api/steamauth" method="post" v-if="this.$store.state.auth.discordUser && !this.$store.state.auth.steamUser">
      <input name="submit" type="image" src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_small.png" alt="Sign-in through Steam">
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({}),
  created () {
    const id = window.localStorage.getItem('steamId')
    const user = window.localStorage.getItem('steamUser')

    if (id && user) {
      this.$store.commit('setSteamId', id)
      this.$store.commit('setSteamUser', JSON.parse(user))
      this.$store.commit('setSteamAuthenticated', true)
    } else if (id) {
      this.fetchUser()
    } else if (!this.$store.state.auth.steamId && !this.$store.state.auth.steamUser && this.$route.query.steamid) {
      this.$store.commit('setSteamId', this.$route.query.steamid)
      this.fetchUser()
    }
  },
  methods: {
    unlink () {
      window.localStorage.removeItem('steamId')
      window.localStorage.removeItem('steamUser')
      this.$store.commit('setSteamAuthenticated', false)
      this.$store.commit('setSteamId', null)
      this.$store.commit('setSteamUser', null)
    },
    async fetchUser () {
      const { data: json } = await axios.get(
        `https://www.macho.ninja:8000/api/steamauth/id/${window.localStorage.steamId ||
          this.$store.state.auth.steamId}`
      )
      const { data: apiUser } = await axios.get(
        `https://www.macho.ninja:8000/api/users/${this.$store.state.auth.discordUser.id}/links`
      )

      console.log('Fetched user')

      // eslint-disable-next-line
      if (apiUser.steam.userId == this.$store.state.auth.steamId) {
        console.log('User is already linked.')
        this.$store.commit('setSteamUser', json)
        window.localStorage.setItem('steamUser', JSON.stringify(json))
        window.localStorage.setItem('steamId', json.steamid)

        if (window.location.toString().includes('macho')) {
          window.location = 'https://www.macho.ninja'
        } else if (window.location.toString().includes('localhost')) {
          window.location = 'https://localhost:8080'
        }

        return true
      } else {
        console.log(
          `${apiUser.steam.userId} != ${this.$store.state.auth.steamId}`
        )
      }

      const linkRes = await axios.post(
        `https://www.macho.ninja:8000/api/steamauth/link?discordId=${
          this.$store.state.auth.discordUser.id
        }&steamId=${json.steamid}&jwt=${window.localStorage.jwt ||
          this.$store.state.auth.jwt}`
      )

      console.log(linkRes.data)

      if (linkRes.data.error) {
        this.$store.commit('setSteamId', null)
        this.$store.commit('setSteamAuthenticated', false)
        window.localStorage.removeItem('steamId')
        console.log('Error')

        if (window.location.toString().includes('macho')) {
          window.location = 'https://www.macho.ninja'
        } else if (window.location.toString().includes('localhost')) {
          window.location = 'https://localhost:8080'
        }

        return false
      }

      this.$store.commit('setSteamUser', json)
      window.localStorage.setItem('steamUser', JSON.stringify(json))
      window.localStorage.setItem('steamId', json.steamid)
      console.log('Linked account')

      if (window.location.toString().includes('macho')) {
        window.location = 'https://www.macho.ninja'
      } else if (window.location.toString().includes('localhost')) {
        window.location = 'https://localhost:8080'
      }
    }
  }
}
</script>
