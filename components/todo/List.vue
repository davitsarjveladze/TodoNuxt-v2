<template>

      <transition-group name="fade" tag="ul" style="padding: 0">
        <template v-for="(task, index) in tasks">
          <ListItem
            @dragenter="dragEnter(index,task.id)"
            @dragend="dragEnd(index)"
            @remove="removeTask(index)"
            @complete="completeTask(task,index)"
            :task="task"
            :key="'item' + index"
          ></ListItem>
        </template>

      </transition-group>
</template>

<script>
import ListItem from "./ListItem";
export default {
  name: "List",
  components : {
    ListItem
  },
  props: {
    tasks: {default: []}
  },
  data() {
    return {
      newTask: '',
      canAdd : true,
      draggableList : '',
      lastDragEnterIndex : 0,
      lastDragEnterId : 0,
    }
  },
  computed: {
    incomplete() {
      return this.tasks.filter(x => !x.status).length;
    }
  },
  methods : {

    completeTask(task,index) {
      // send request to update status
      this.$store.$axios.get('todos/update',{
        params: {
          id : task.id,
          status : !task.status,
          title : task.title,
          order : task.order,
        }
      }).then((data) => {
        if (data.status === 200) {
          task.status = ! task.status;
          this.$store.commit('todos/update', {item : task, index : index})
        }
      })
    },
    removeTask(index) {
      this.$store.$axios.get('todos/delete', {
        params: {
          ides: JSON.stringify([this.tasks[index].id])
        }
      }).then((data) => {
        if (data) {
          // set in store new list
          this.$store.commit('todos/sliceByIndex', index)
        }
      })
    },
    dragEnter(index,id) {
      console.log(this.lastDragEnterId,id)
      if (this.lastDragEnterId !== id) {
        let element = document.getElementById(id)
        element.classList.add("drop-place");
        let elementPast = document.getElementById(this.lastDragEnterId)
        elementPast?.classList.remove("drop-place");
        this.lastDragEnterId = id
      }
      this.lastDragEnterIndex = index
    },

    dragEnd(index) {
      if(typeof this.lastDragEnterIndex === 'number') {
        let currentOrder = this.tasks[this.lastDragEnterIndex]['order'] + 1
        let prevItemOrder = this.tasks[this.lastDragEnterIndex]['order']
        if (this.lastDragEnterIndex > index) {
          if (this.tasks[this.lastDragEnterIndex + 1]) {
            currentOrder = (prevItemOrder + this.tasks[this.lastDragEnterIndex + 1]['order']) / 2
          }
        }
        if (this.lastDragEnterIndex < index){
          if (this.lastDragEnterIndex !== 0) {
            currentOrder = (prevItemOrder + this.tasks[this.lastDragEnterIndex - 1]['order']) / 2
          }
        }
        if (this.lastDragEnterIndex === 0) {
          currentOrder =  this.tasks[this.lastDragEnterIndex]['order'] -1
        }
        this.$store.$axios.get('todos/update',{
          params : {
            id : this.tasks[index]['id'],
            order : currentOrder
          }
        }).then((data) => {
          if (data.status === 200) {
            this.$store.commit('todos/updateOrder', {index : index ,currentOrder : currentOrder})
            let elementPast = document.getElementById(this.lastDragEnterId)
            elementPast?.classList.remove("drop-place");
            this.lastDragEnterIndex = null
            this.lastDragEnterId = null
          }
        })
      }
    },
  },
}
</script>
