<template>
  <div id='chips'>
    <v-avatar
      :tile="false"
      size="70"
      color="grey lighten-4"
      v-if="this.$store.state.auth.discordUser && this.$store.state.auth.discordUser.avatar"
    >
      <img :src="'https://cdn.discordapp.com/avatars/' + this.$store.state.auth.discordUser.id + '/' + this.$store.state.auth.discordUser.avatar + '.png'" :alt="this.$store.state.auth.discordUser.username" />
    </v-avatar>

    <v-container grid-list-xl>
      <p>Welcome to the official Macho GUI! This website is mostly for people that cannot/don't want to read the JSON on the official&nbsp;<a href="http://macho.ninja:8000/users" target="_blank" rel="noopener">Macho API</a>.</p>
    </v-container>
  </div>
</template>

<script>
export default {
}
</script>
