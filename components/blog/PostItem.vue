<template>

    <v-card
        :to="'/post/' + post.id"
        class="mx-auto"
        max-width="355"
    >
      <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
      ></v-img>

      <v-card-title>
        {{ post.title }}
      </v-card-title>

      <v-card-subtitle>
        {{ post.user.name }}
      </v-card-subtitle>

    </v-card>

</template>

<script>
export default {
  name: "PostItem",
  props : {
    post : Object,
  },
  data: () => ({
    show: false,
  }),
}
</script>

<style scoped>

</style>