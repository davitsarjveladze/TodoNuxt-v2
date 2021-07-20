<template >
  <li class="list-group"
      :class="task.status ? 'completed' : ''"
      :id="task.id"
      draggable="true"
      @dragenter="$emit('dragenter')"
      @dragleave="$emit('dragleave')"
      @dragend="$emit('dragend')"
  >
    <span  class="drag-button fas fa-arrows-alt"


    >
<!--      <i class="fas fa-arrows-alt"></i>-->
    </span>
    <div class="list-item"
         @click.self="$emit('complete')"
    > {{ task.title }}
    </div>
    <span class="remove-button" @click="$emit('remove')">
      <i class="fa fa-times"></i>
    </span>
  </li>
</template>

<script>
export default {
  name: "ListItem",
  props: ['task'],
}
</script>

