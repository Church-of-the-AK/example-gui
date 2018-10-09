<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <buttons />
            <div class='guilds'>
              <p style="font-size:20px">{{ msg }}</p>
              <div id='guildsList'>
                <table style="margin:auto" class="centered">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody v-for="guild in guilds" :key="JSON.stringify(guild.id)" style="font-weight:normal">
                  <tr style="cursor:pointer" @click="loadGuildInfo(guild.id)">
                    <td>
                      {{ guild.name }}
                      <div :id="guild.id"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/MachoBot/gui" icon large target="_blank" rel="noopener">
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
// import io from 'socket.io-client'
import axios from 'axios'
import Footer from './Footer.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import Chips from './Chips.vue'
import Buttons from './Buttons.vue'
export default {
  name: 'Guilds',
  components: {
    'customFooter': Footer,
    'navigationDrawer': NavigationDrawer,
    'chips': Chips,
    'buttons': Buttons
  },
  data () {
    return {
      msg: 'Hey, look! Guilds!',
      guilds: null
      // socket: io.connect('http://51.15.224.123:5000/')
    }
  },
  /* mounted () {
    this.socket.on('connect', (data) => {
      console.log('Connected')
      this.socket.emit('join', 'Hello server')
    })

    this.socket.on('info', (data) => {
      console.log('====================================')
      console.log(`Info message from the API: ${data}`)
      console.log('====================================')
    })

    this.socket.on('userLevelUpdated', (data) => {
      console.log('====================================')
      console.log('User Level Updated')
      console.log('====================================')
      console.log(data)
    })

    this.socket.on('userProfileUpdated', (data) => {
      console.log('====================================')
      console.log('User Profile Updated')
      console.log('====================================')
      console.log(data)
    })
  }, */
  created: function () {
    this.loadGuilds()
  },
  methods: {
    loadGuilds: function () {
      if (this.guilds) {
        return true
      }

      axios.get('https://macho.ninja/api/guilds').then(response => {
        this.guilds = response.data
      })
    },
    loadGuildInfo: function (id) {
      if (this.$store.state.opened.guildsOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.$store.commit('removeGuildsOpen', id)
        return true
      }
      if (this.$store.state.opened.guildsOpened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:initial')
        this.$store.commit('addGuildsOpen', id)
        return true
      }
      this.$store.commit('addGuildsOpen', id)
      this.$store.commit('addGuildsOpened', id)
      axios.get(`https://macho.ninja/api/guilds/${id}`).then(response => {
        let div = document.getElementById(response.data.id)
        div.innerHTML = `
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
          <td>Level up messages enabled</td>
          <td>${response.data.settings.levelUpMessages}</td>
        </tr>
        <tr>
        <td>Suggestion channel</td>
        <td>${response.data.settings.suggestionChannel}</td>
        </tr>
        <tr>
          <td>Music text channel</td>
          <td>${response.data.settings.musicTextChannel}</td>
        </tr>
        <tr>
          <td>Music voice channel</td>
          <td>${response.data.settings.musicVoiceChannel}</td>
        </tr>
        <tr>
          <td>Log channel</td>
          <td>${response.data.settings.logChannel}</td>
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
