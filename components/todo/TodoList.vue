<template>
  <section class="tasks" >

  <div class="list-header" >
    <h1>
      Todo List
      <transition name="fade">
        <small v-if="incomplete">({{ incomplete }})</small>
      </transition>
    </h1>
    <div>

      <button class="button-style clear-completed-color"
              @click="clearCompleted">
        <i class="fa fa-check"></i> Clear Completed
      </button>
      <button class="button-style clear-all-color"
              @click="clearAll">
        <i class="fa fa-trash"></i> Clear All
      </button>

    </div>
  </div>


  <div ref="task.id" class="form-group" style="margin-bottom: 30px">
    <input class="form-field" @keyup.enter="addTask" v-model="newTask"  placeholder="New item">
    <span @click="addTask"><i class="fa fa-plus"></i><b>NEW</b></span>
  </div>
  <List :tasks="todoList"></List>
  </section>
</template>

<script>
import List from "./List";
export default {
  name: "TodoList",
  components: {
    List
  },
  data() {
    return {
      newTask : '',
      todoList : [],
      canAdd : true
    }
  },
  computed: {
    incomplete() {
      return this.todoList.filter(x => !x.status).length;
    }
  },
  mounted() {

    // Taking Full list from Api
    this.$store.dispatch('todos/getList');
    this.todoList = JSON.parse(JSON.stringify(this.$store.state.todos.list))

  },
  methods : {
    clearCompleted() {
      let ides = [];
      this.todoList.filter(x => {
        if (x.status)
          ides.push(x.id)
      })
      console.log(ides)
      if (ides.length > 0) {
        this.$store.$axios.get('todos/delete', {
          params: {
            ides: JSON.stringify(ides)
          }
        }).then((data) => {
          if (data.status === 200) {
            this.$store.commit('todos/clearCompleted')
          }
        })
      }
    },
    clearAll() {
      let ides = [];
      this.todoList.filter(x => {
        ides.push(x.id)
      })
      if (ides.length > 0) {
        this.$store.$axios.get('todos/delete', {
          params: {
            ides: JSON.stringify(ides)
          }
        }).then((data) => {
          if (data.status === 200) {
            this.$store.commit('todos/clearAll')
          }
        })
      }
    },
    addTask() {
      if (this.newTask && this.canAdd) {
        this.canAdd = false
        let order = this.todoList.length ? Math.ceil(this.todoList[this.todoList.length - 1]['order']) + 1 : 1
        this.$store.$axios.get('todos/insert',{
          params: {
            title: this.newTask,
            order: order
          }
        }).then((data) => {
          console.log(data);
          if (data.status === 201 ) {
            this.$store.commit('todos/add', {
              title: this.newTask,
              status : false,
              order : order,
              id : data.id,
            })
            this.newTask = '';
          }
          setTimeout(() => { this.canAdd = true },10)
        })
      }
    },
  },
  watch : {
    // Watching to Todolist store
    '$store.state.todos.list' : {
      handler () {
        this.todoList = JSON.parse(JSON.stringify(this.$store.state.todos.list))
      },
      deep : true
    }
  }
}
</script>

