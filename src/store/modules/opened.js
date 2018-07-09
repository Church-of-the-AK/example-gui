export default {
  state: {
    usersOpened: [],
    usersOpen: [],
    guildsOpened: [],
    guildsOpen: [],
    referralsOpened: [],
    referralsOpen: [],
    giveawaysOpened: [],
    giveawaysOpen: []
  },
  mutations: {
    addUsersOpen (state, id) {
      state.usersOpen.push(id)
    },
    removeUsersOpen (state, id) {
      state.usersOpen.splice(state.usersOpen.indexOf(id), 1)
    },
    addUsersOpened (state, id) {
      state.usersOpened.push(id)
    },
    removeUsersOpened (state, id) {
      state.usersOpened.splice(state.usersOpened.indexOf(id), 1)
    },
    addGuildsOpen (state, id) {
      state.guildsOpen.push(id)
    },
    removeGuildsOpen (state, id) {
      state.guildsOpen.splice(state.guildsOpen.indexOf(id), 1)
    },
    addGuildsOpened (state, id) {
      state.guildsOpened.push(id)
    },
    removeGuildsOpened (state, id) {
      state.guildsOpened.splice(state.guildsOpened.indexOf(id), 1)
    },
    addReferralsOpen (state, id) {
      state.referralsOpen.push(id)
    },
    removeReferralsOpen (state, id) {
      state.referralsOpen.splice(state.referralsOpen.indexOf(id), 1)
    },
    addReferralsOpened (state, id) {
      state.referralsOpened.push(id)
    },
    removeReferralsOpened (state, id) {
      state.referralsOpened.splice(state.referralsOpened.indexOf(id), 1)
    },
    addGiveawaysOpen (state, id) {
      state.giveawaysOpen.push(id)
    },
    removeGiveawaysOpen (state, id) {
      state.giveawaysOpen.splice(state.giveawaysOpen.indexOf(id), 1)
    },
    addGiveawaysOpened (state, id) {
      state.giveawaysOpened.push(id)
    },
    removeGiveawaysOpened (state, id) {
      state.giveawaysOpened.splice(state.giveawaysOpened.indexOf(id), 1)
    }
  },
  actions: {
  }
}
