<template>
  <v-toolbar
      color="purple"
      dark
  >
    <template v-if="showCategory">
      <v-btn v-on:click="callback" text>
        {{ ButtonText }}
      </v-btn>
    </template>

    <v-divider
        class="mx-4"
        vertical
    ></v-divider>

    <v-spacer></v-spacer>

    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/" text>
        Blog
      </v-btn>

      <v-divider vertical></v-divider>

      <v-btn to="/todo" text>
        Todo
      </v-btn>

      <v-divider vertical></v-divider>

    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: "HorizontalMenu",
  props : {
    showCategory : false,
    callback : Function,
    ButtonText : String,
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
}
</script>

<style scoped>

</style>