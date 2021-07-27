<template>
<div>
  <HorizontalMenu />
  <v-app v-if="Object.values(post).length !== 0" id="app">
    <v-container>
      <v-row class="album p-1">
        <template>
          <v-col cols="12" md="3"   >
            <v-card class="mx-auto">
              <div class="hover-wrapper">
                <v-img height="250"
                       eager
                       position="center center"
                       :src="'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'"
                       :href="post.url">
                </v-img>
              </div>
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-text>{{ post.summary }}</v-card-text>
              <v-card-actions class="justify-space-between">
                <div class="overline"> {{ post['published_at'] }} </div>
                <p class="mb-0 subtitle-1">{{post.user ? post.user['name'] : '' }}</p>

              </v-card-actions>
              <v-divider class="mt-3"></v-divider>
              <v-card-text>
                <div class="d-flex align-center">
                  <v-col sm="12">
                    {{post.content}}
                  </v-col>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-app>
  {{ $route.params }}
  {{post}}
</div>
</template>

<script>
import HorizontalMenu from "../../components/nav/HorizontalManu";
export default {
  name: "_id.vue",
  components :{
    HorizontalMenu
  },
  data () {
    return {
      post : {},
    }
  },
  mounted() {
    this.getPost();
  },
  methods : {
    async getPost () {
      await this.$store.$axios.get('posts/'+this.$route.params.id).then((data) => {
        console.log(data)
        if (data.status === 200) {
          this.post =  data.data[0][0]
        }
      })
    }
  }

}
</script>

<style scoped>

</style>