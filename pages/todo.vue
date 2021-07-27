<template>
  <div>
    <HorizontalMenu/>
    <TodoList/>
  </div>

</template>
<script>
import TodoList from '../components/todo/TodoList.vue'
import HorizontalMenu from "../components/nav/HorizontalManu";
export default {
  components : {
    TodoList,
    HorizontalMenu,
  }
}
</script>
