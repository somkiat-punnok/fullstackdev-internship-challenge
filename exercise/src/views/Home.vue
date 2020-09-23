<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Vending Machine Problem</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <manu />
  </div>
</template>

<script>
// @ is an alias to /src
import manu from "../components/manu";
export default {
  name: "Home",
  components: {
    manu,
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.v-toolbar--prominent .v-toolbar__title {
  font-size: 40px;
  padding-top: 6px;
  margin-top: 1rem;
}
.v-toolbar--prominent:not(.v-toolbar--bottom) .v-toolbar__title {
  align-self: flex-end;
  padding-bottom: 6px;
  padding-top: 0;
  font-size: 40px;
}
</style>
