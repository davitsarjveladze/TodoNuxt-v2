<template>
  <div>
  <HorizontalMenu v-bind:show-category="true"
                  v-bind:button-text="'Category'"
                  v-bind:callback="ChangeDrawer"/>
  <v-app>
  <div class="d-flex row">
    <v-col
        cols="1"
    >
    <Category
              v-bind:callback="setCurrentCategory"
              v-bind:categories="$store.state.categories"
              v-bind:drawer="CategoryShower" />
    </v-col>
    <v-col
        cols="11"
    >
      <v-col class="mb-3 d-flex justify-space-around " cols="12">
        <template v-for="tag in $store.state.tags" >
          <v-chip
              v-on:click="tagId === tag.id ? tagId = null  : tagId = tag.id"
              :class="tagId === tag.id ? 'primary' : ''"
          >
            {{tag.name}}
          </v-chip>
        </template>

      </v-col>
    <div class="row">
      <template v-for="post in posts" >
        <PostItem class="mb-3" :key="post['id']+'p'" v-bind:post="post"></PostItem>
      </template>
    </div>

    <div class="text-center mt-3" style="width: 100%">
      <v-pagination
          v-model="currentPage"
          :length="pagination"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
      ></v-pagination>
    </div>

    </v-col>
  </div>
  </v-app>
  </div>
</template>
<script>
import Category from "../components/blog/Category";
import HorizontalMenu from "../components/nav/HorizontalManu";
import PostsList from "../components/blog/PostsList";
import PostItem from "../components/blog/PostItem";
export default {
  components : {
    Category,
    HorizontalMenu,
    PostsList,
    PostItem,
  },
  data() {
    return {
      posts: [],
      pagination : 1,
      currentPage : 1,
      tagId : null,
      catId : null,
      PostCountByFilters : 0,
      CategoryShower : false,
    }
  },
  mounted() {
    this.loadData();
  },
  methods : {
    loadData() {
      this.$store.dispatch('getCategories');
      this.$store.dispatch('getTags');
      this.loadPostsData({
        page : this.currentPage
      })
    },

    loadPostsData(params) {
      this.$store.$axios.get('posts',{
        params : params
      }).then((data) => {
        if (data.status === 200) {
          this.setPaginationLinks(data.data['last_page']);
          this.setPosts(data.data['data']);
        }
      })
    },
    makeParamsForPosts() {
      let Params = {
        page : this.currentPage
      }
      if (this.tagId) {
        Params['tag'] = this.tagId
      }
      if (this.catId) {
        Params['category'] = this.catId
      }
      this.loadPostsData(Params)
    },
    setPaginationLinks(lastPage) {
      this.pagination = lastPage
    },
    setPosts(posts) {
      this.posts = posts
    },

    setCurrentCategory($id) {
      this.catId = $id
      this.makeParamsForPosts();
      this.ChangeDrawer();
    },

    ChangeDrawer() {
      this.CategoryShower = !this.CategoryShower
    }
  },
  watch : {
    'tagId' : {
      handler () {
        this.makeParamsForPosts();
      }
    }
  }
}
</script>

