<script setup lang="ts">
import { type Column, type Task } from "~/types";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";

const columns = ref<Column[]>([
  {
    uuid: nanoid(),
    title: "Create landing page",
    tasks: [
      { uuid: nanoid(), title: "Create hero section", createdAt: new Date() },
      { uuid: nanoid(), title: "Create call to action", createdAt: new Date() },
      { uuid: nanoid(), title: "Create marketing copy", createdAt: new Date() },
    ],
  },
  {
    uuid: nanoid(),
    title: "Create marketing strategy",
    tasks: [
      { uuid: nanoid(), title: "Create new strategy", createdAt: new Date() },
      { uuid: nanoid(), title: "Create call to action", createdAt: new Date() },
      { uuid: nanoid(), title: "Create new feature", createdAt: new Date() },
    ],
  },
  {
    uuid: nanoid(),
    title: "Create ecommerce strategy",
    tasks: [
      {
        uuid: nanoid(),
        title: "Select ecommerce strategy",
        createdAt: new Date(),
      },
      {
        uuid: nanoid(),
        title: "Choose ecommerce platform",
        createdAt: new Date(),
      },
      {
        uuid: nanoid(),
        title: "Develop ecommerce strategy",
        createdAt: new Date(),
      },
    ],
  },
]);
</script>

<template>
  <draggable
    v-model="columns"
    class="flex gap-5 overflow-x-auto items-start"
    group="columns"
    item-key="uuid"
    animation="300"
    handle=".drag-handler"
  >
    <template #item="{ element }: { element: Column }">
      <section class="column bg-gray-200 px-4 py-2 rounded-md min-w-[300px]">
        <header class="flex gap-1">
          <DragHandle />
          <h2 class="text-lg font-semibold mb-3">{{ element.title }}</h2>
        </header>
        <draggable
          v-model="element.tasks"
          group="tasks"
          item-key="uuid"
          animation="300"
          handle=".drag-handler"
        >
          <template #item="{ element: task }: { element: Task }">
            <TrelloBoardTask :task="task" />
          </template>
        </draggable>
        <footer>
          <button class="w-full bg-blue-400 py-1 rounded-sm">
            <span class="font-semibold">+ Add task</span>
          </button>
        </footer>
      </section>
    </template>
  </draggable>
</template>
