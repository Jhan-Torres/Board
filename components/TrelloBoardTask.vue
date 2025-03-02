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
    class="task bg-white p-2 mb-2 rounded-sm shadow-sm max-w-[300px]"
  >
    <span>
      {{ task.title }}
    </span>
  </section>
</template>
