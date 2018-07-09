<template>
  <v-footer height="auto">
    <v-card
      flat
      tile
      class="lighten-1 white--text text-xs-center card card--flat card--tile"
      style="width:100%;"
    >
      <v-card-text>
        <v-tooltip top>
          <v-btn icon slot="activator" class="mx-3 white--text" target="_blank" href="https://github.com/jasonhaxstuff">
            <v-icon size="24px">{{ icons[0] }}</v-icon>
          </v-btn>
          <span>GitHub</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn icon slot="activator" class="mx-3 white--text" target="_blank" href="https://twitter.com/jasonhaxstuff">
            <v-icon size="24px">{{ icons[1] }}</v-icon>
          </v-btn>
          <span>Twitter</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn icon slot="activator" class="mx-3 white--text" target="_blank" href="https://discord.gg/ndxe5Qm">
            <v-icon size="24px">{{ icons[2] }}</v-icon>
          </v-btn>
          <span>Discord</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn icon slot="activator" class="mx-3 white--text" target="_blank" href="https://namemc.com/profile/JasonHaxStuff.1">
            <v-icon size="24px">{{ icons[3] }}</v-icon>
          </v-btn>
          <span>Minecraft</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn icon slot="activator" class="mx-3 white--text" target="_blank" href="https://www.instagram.com/rickandmorty/">
            <v-icon size="24px">{{ icons[4] }}</v-icon>
          </v-btn>
          <span>Instagram</span>
        </v-tooltip>
      </v-card-text>
      <v-card-text class="white--text pt-0">
        Thanks to Tanner Goins for teaching me a lot about programming in general.
      </v-card-text>
      <v-card-text class="white--text">
        &copy;2018 — <strong>JasonHaxStuff</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ['fab fa-github', 'fab fa-twitter', 'fab fa-discord', 'fas fa-cube', 'fab fa-instagram']
  })
}
</script>
