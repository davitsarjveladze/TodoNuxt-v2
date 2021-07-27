<template>
  <v-navigation-drawer
        v-if="drawer2"
        v-model="drawer2"
        absolute
        temporary
        dark
    >

      <v-list dense>
        <template v-for="item in categories">
        <template v-if="item[0].children">
          <v-list-group
              :value="true"
              no-action
              sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item[0].title }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
                v-for="itemCh in item[0].children"
                :key="itemCh.id"
                link
                v-on:click="callback(itemCh.id)"
            >
              <v-list-item-title v-text="itemCh.title"></v-list-item-title>

              <v-list-item-icon>
                <v-icon >mdi-home-city</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>

        </template>
        <template v-else>
          <v-list-item
              v-on:click="callback(item.id)"
              :key="item.id"
              link
          >
            <v-list-item-icon>
              <v-icon>mdi-home-city</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{item[0].title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        </template>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
  import Category from './Category'
export default {
  components : {
    Category
  },

  props : ['drawer','categories','callback'],

  data: () => ({
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline'],
    ],
    cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],
    items: [
      { title: 'Home', icon: 'mdi-home-city' },
      { title: 'My Account', icon: 'mdi-account' },
      { title: 'Users', icon: 'mdi-account-group-outline' },
    ],
    drawer2 : false,
  }),
  watch: {
    drawer : {
      handler() { // watch it
        this.drawer2 = this.drawer;
      },
    }
  }
}
</script>

<style scoped>

</style>