<script setup lang="ts">
import { type ID, type Task } from "~/types";

interface Props {
  task: Task;
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "delete", uuid: ID): void;
}>();

const focused = ref(false);
onKeyStroke("Backspace", () => {
  if (focused.value) {
    emits("delete", props.task.uuid);
  }
});
</script>

<template>
  <section
    :title="task.createdAt.toLocaleDateString()"
    class="task bg-white p-2 mb-2 rounded-sm shadow-sm max-w-[300px] flex"
    @click="focused = true"
    @blur="focused = false"
    tabindex="0"
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
.task:focus,
.task:focus-visible {
  @apply outline-gray-400 !important;
  outline: gray auto 1px;
}

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
