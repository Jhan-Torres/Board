<script setup lang="ts">
import { type Task } from "~/types";

interface Props {
  task: Task;
}

defineProps<Props>();
</script>

<template>
  <section
    :title="task.createdAt.toLocaleDateString()"
    class="task bg-white p-2 mb-2 rounded-sm shadow-sm max-w-[300px] flex"
  >
    <span>
      <DragHandle />
      {{ task.title }}
    </span>
  </section>
</template>

<style scoped>
/* .sortable-chosen {
  @apply bg-blue-400;
} */

.sortable-drag .task {
  transform: scale(1.1) rotate(3deg);
}

.sortable-ghost .task {
  @apply bg-gray-200 relative;
}

.sortable-ghost .task::after {
  content: "";
  @apply bg-gray-200 absolute top-0 bottom-0 left-0 right-0 opacity-50 rounded;
}
</style>
