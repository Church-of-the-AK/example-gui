<template>
  <v-app id="inspire" dark>
    <navigationDrawer/>
    <v-content>
      <v-container fluid fill-height text-xs-center>
        <v-layout justify-center align-center row wrap>
          <chips />
          <v-flex xs12>
            <buttons />
          </v-flex>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn slot="activator" href="https://github.com/machobot/gui" icon large target="_blank" rel="noopener">
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
import DiscordAuth from './DiscordAuth.vue'
import NavigationDrawer from './NavigationDrawer.vue'
import Footer from './Footer.vue'
import Chips from './Chips.vue'
import Buttons from './Buttons.vue'
export default {
  components: {
    'discordAuth': DiscordAuth,
    'navigationDrawer': NavigationDrawer,
    'customFooter': Footer,
    'chips': Chips,
    'buttons': Buttons
  },
  data: () => ({
  }),
  created () {
    if (!window.location.toString().includes('www.') && !window.location.toString().includes('localhost')) {
      console.log(`Redirecting (old link: ${window.location.toString()})`)
      window.location = 'https://www.macho.ninja'
    }
  }
}
</script>
