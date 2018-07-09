<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <buttons />
              <div class='giveaways'>
                <p style="font-size:20px">{{ msg }}</p>
                <v-tooltip right>
                  <v-btn slot="activator" @click="changeVisibility()" icon large>
                    <v-icon large id="giveawaysArrow">arrow_drop_down</v-icon>
                  </v-btn>
                  <span id="viewGiveaways">Show Giveaways</span>
                </v-tooltip>
                <div id='giveawaysList' style="display:none">
                  <table style="margin:auto" class="centered">
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody v-for="giveaway in giveaways" :key="JSON.stringify(giveaway.id)" style="font-weight:normal">
                    <tr style="cursor:pointer" @click="loadGiveawayInfo(giveaway.id)">
                      <td>
                        {{ giveaway.name }}
                        <div :id="giveaway.id"></div>
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
  name: 'Giveaways',
  data () {
    return {
      msg: 'Hey, look! Giveaways!',
      giveaways: null
    }
  },
  created: function () {
    this.loadGiveaways()
  },
  methods: {
    loadGiveaways: function () {
      axios.get('https://natsuki.tk/api/giveaways').then(response => {
        this.giveaways = response.data
      })
    },
    loadGiveawayInfo: function (id) {
      if (this.$store.state.opened.giveawaysOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.$store.commit('removeGiveawaysOpen', id)
        return true
      }
      if (this.$store.state.opened.giveawaysOpened.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:initial')
        this.$store.commit('addGiveawaysOpen', id)
        return true
      }
      this.$store.commit('addGiveawaysOpen', id)
      this.$store.commit('addGiveawaysOpened', id)
      axios.get(`https://natsuki.tk/api/giveaways/${id}`).then(response => {
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
      let button = document.getElementById('viewGiveaways')
      let div = document.getElementById('giveawaysList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Giveaways'
        document.getElementById('giveawaysArrow').textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Giveaways'
        document.getElementById('giveawaysArrow').textContent = 'arrow_drop_down'
      }
    }
  }
}
</script>

<style>
</style>
