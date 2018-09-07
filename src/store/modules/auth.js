export default {
  state: {
    discordAuthenticated: false,
    discordCode: null,
    discordAccessToken: null,
    discordUser: null,
    steamAuthenticated: null,
    steamId: null,
    steamUser: null,
    githubAuthenticated: null,
    githubId: null,
    githubUser: null,
    jwt: null
  },
  mutations: {
    setDiscordAuthenticated (state, bool) {
      state.discordAuthenticated = bool
    },
    setDiscordCode (state, code) {
      state.discordCode = code
    },
    setDiscordToken (state, token) {
      state.discordAccessToken = token
    },
    setDiscordUser (state, user) {
      state.discordUser = user
    },
    setSteamUser (state, user) {
      state.steamUser = user
    },
    setSteamAuthenticated (state, bool) {
      state.steamAuthenticated = bool
    },
    setSteamId (state, id) {
      state.steamId = id
    },
    setGithubUser (state, user) {
      state.githubUser = user
    },
    setGithubAuthenticated (state, bool) {
      state.githubAuthenticated = bool
    },
    setGithubId (state, id) {
      state.githubId = id
    },
    setJWT (state, jwt) {
      state.jwt = jwt
    }
  },
  actions: {

  }
}
