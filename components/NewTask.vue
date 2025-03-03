<script setup lang="ts">
import type { Task } from "~/types";
import { nanoid } from "nanoid";

const emit = defineEmits<{
  (e: "create", payload: Task): void;
}>();

const title = ref("");
const focused = ref(false);

const createTask = (e: Event) => {
  if (title.value.trim()) {
    e.preventDefault();
    emit("create", {
      uuid: nanoid(),
      title: title.value,
      createdAt: new Date(),
    });
  }
  title.value = "";
};
</script>

<template>
  <section>
    <textarea
      v-model="title"
      :class="{ 'h-20': focused, 'h-8': !focused }"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      @focus="focused = true"
      @blur="focused = false"
      class="p-1 w-full rounded-sm resize-none border-none bg-transparent focus:outline-none focus:bg-white focus:shadow"
      :placeholder="focused ? 'What needs to be done?' : '+ Add task'"
    />
  </section>
</template>
