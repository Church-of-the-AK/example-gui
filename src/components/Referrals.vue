<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <buttons />
            <div class='referrals'>
              <p style="font-size:20px">{{ msg }}</p>
              <v-tooltip right>
                <v-btn slot="activator" @click="changeVisibility()" icon large>
                  <v-icon large id="referralsArrow">arrow_drop_down</v-icon>
                </v-btn>
                <span id="viewReferrals">Show Users</span>
              </v-tooltip>
              <div id='referralsList' style="display:none">
                <table style="margin:auto" class="centered">
                <thead>
                  <tr>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody v-for="referral in referrals" :key="JSON.stringify(referral.id)" style="font-weight:normal">
                  <tr style="cursor:pointer" @click="loadReferralInfo(referral.id)">
                    <td>
                      {{ referral.name }}
                      <div :id="referral.id"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
          </div>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/jasonhaxstuff/natsukigui" icon large target="_blank">
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
  components: {
    'customFooter': Footer,
    'navigationDrawer': NavigationDrawer,
    'chips': Chips,
    'buttons': Buttons
  },
  name: 'Referrals',
  data () {
    return {
      msg: 'Hey, look! Referrals!',
      referrals: null
      // socket: io.connect('http://51.15.224.123:5000/', {transports: ['websocket']})
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
    this.loadReferrals()
  },
  methods: {
    loadReferrals: function () {
      axios.get('https://natsuki.tk/api/referrals').then(response => {
        this.referrals = response.data
      })
    },
    loadReferralInfo: function (id) {
      if (this.$store.state.opened.referralsOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.$store.commit('removeReferralsOpen', id)
        return true
      }
      if (this.$store.state.opened.referralsOpened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:initial')
        this.$store.commit('addReferralsOpen', id)
        return true
      }
      this.$store.commit('addReferralsOpen', id)
      this.$store.commit('addReferralsOpened', id)
      axios.get(`https://natsuki.tk/api/referrals/${id}`).then(response => {
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
        <tr>
          <td>Support tickets</td>
          <td>${response.data.supportTickets}</td>
        </tr>
        <tr>
          <td>Suggestions</td>
          <td>${response.data.suggestions}</td>
        </tr>
        </tbody>
      </table>
      <hr>
        `
      })
    },
    changeVisibility: function () {
      let button = document.getElementById('viewReferrals')
      let div = document.getElementById('referralsList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Referrals'
        document.getElementById('referralsArrow').textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Referrals'
        document.getElementById('referralsArrow').textContent = 'arrow_drop_down'
      }
    }
  }
}
</script>

<style>
</style>
