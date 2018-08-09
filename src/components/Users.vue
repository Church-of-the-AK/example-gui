<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <buttons />
            <div id='usersData'>
              <p style="font-size:20px">{{ msg }}</p>
              <v-tooltip right>
                <v-btn slot="activator" @click="loadUsers();changeVisibility()" icon large>
                  <v-icon large id="usersArrow">arrow_drop_down</v-icon>
                </v-btn>
                <span id="viewUsers">Show Users</span>
              </v-tooltip>
              <div id='usersList' style="display:none">
                <table style="margin:auto" class="centered">
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody v-for="user in users" :key="JSON.stringify(user.id)" style="font-weight:normal">
                    <tr style="cursor:pointer" @click="loadUserInfo(user.id)">
                      <td>
                        {{ user.name }}
                      </td>
                    </tr>
                    <div :id="user.id"></div>
                  </tbody>
                </table>
              </div>
            </div>
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/jasonhaxstuff/machogui" icon large target="_blank">
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
  name: 'Users',
  components: {
    'customFooter': Footer,
    'navigationDrawer': NavigationDrawer,
    'chips': Chips,
    'buttons': Buttons
  },
  data () {
    return {
      msg: 'Hey, look! Users!',
      users: null,
      headers: [
        {
          text: 'Property',
          align: 'center',
          sortable: false,
          value: 'property'
        },
        { text: 'Value', value: 'setting', align: 'center' }
      ]
    }
  },
  created: function () {
  },
  methods: {
    loadUsers: function () {
      if (this.users) {
        return true
      }
      axios.get('http://macho.ga:8000/users').then(response => {
        this.users = response.data
      })
    },
    loadUserInfo: function (id) {
      if (this.$store.state.opened.usersOpen.includes(id)) {
        document.getElementById(id).setAttribute('style', 'display:none')
        this.$store.commit('removeUsersOpen', id)
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
        let div = document.getElementById(id)
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
          <td>Admin</td>
          <td>${response.data.admin}</td>
        </tr>
        <tr>
          <td>Date of last message</td>
          <td>${response.data.dateLastMessage}</td>
        </tr>
        <tr>
          <td>Steam ID</td>
          <td>${response.data.links.steamId}</td>
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
    },
    changeVisibility: function () {
      let button = document.getElementById('viewUsers')
      let arrow = document.getElementById('usersArrow')
      let div = document.getElementById('usersList')
      var x = div.offsetParent
      if (x === null) {
        div.setAttribute('style', 'display:initial')
        button.textContent = 'Hide Users'
        arrow.textContent = 'arrow_drop_up'
      } else {
        div.setAttribute('style', 'display:none')
        button.textContent = 'Show Users'
        arrow.textContent = 'arrow_drop_down'
      }
    }
  }
}
</script>

<style>
</style>
