/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Home from '@/components/Home'
import store from '../store'
import Guilds from '@/components/Guilds'
import Users from '@/components/Users'
import Giveaways from '@/components/Giveaways'
import Referrals from '@/components/Referrals'
import Profile from '@/components/Profile'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/users',
      name: 'Users',
      component: Users
    },
    {
      path: '/guilds',
      name: 'Guilds',
      component: Guilds
    },
    {
      path: '/giveaways',
      name: 'Giveaways',
      component: Giveaways
    },
    {
      path: '/referrals',
      name: 'Referrals',
      component: Referrals
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
