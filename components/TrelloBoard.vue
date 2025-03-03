<script setup lang="ts">
import { type Column, type Task } from "~/types";
import { nanoid } from "nanoid";
import draggable from "vuedraggable";

const columns = useLocalStorage<Column[]>(
  "trellBoard",
  [
    {
      uuid: nanoid(),
      title: "Create landing page",
      tasks: [
        { uuid: nanoid(), title: "Create hero section", createdAt: new Date() },
        {
          uuid: nanoid(),
          title: "Create call to action",
          createdAt: new Date(),
        },
        {
          uuid: nanoid(),
          title: "Create marketing copy",
          createdAt: new Date(),
        },
      ],
    },
    {
      uuid: nanoid(),
      title: "Create marketing strategy",
      tasks: [
        { uuid: nanoid(), title: "Create new strategy", createdAt: new Date() },
        {
          uuid: nanoid(),
          title: "Create call to action",
          createdAt: new Date(),
        },
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
  ],
  {
    serializer: {
      read: (val) => {
        return JSON.parse(val).map((column: Column) => {
          column.tasks = column.tasks.map((task: Task) => {
            task.createdAt = new Date(task.createdAt);
            return task;
          });
          return column;
        });
      },
      write: (val) => JSON.stringify(val),
    },
  }
);

const alt = useKeyModifier("Alt");

const createColumn = () => {
  columns.value.push({
    uuid: nanoid(),
    title: "New column",
    tasks: [],
  });
  nextTick(() => {
    (
      document.querySelector(
        ".column:last-of-type .title-input"
      ) as HTMLInputElement
    ).focus();
  });
};
</script>

<template>
  <section class="flex items-start gap-5">
    <draggable
      v-model="columns"
      class="scroll-bar-styles flex gap-5 overflow-x-auto items-start"
      group="columns"
      item-key="uuid"
      animation="300"
      handle=".drag-handler"
    >
      <template #item="{ element }: { element: Column }">
        <section class="column bg-gray-200 px-4 py-2 rounded-md min-w-[300px]">
          <header class="flex gap-1">
            <DragHandle />
            <input
              v-model="element.title"
              class="title-input bg-transparent rounded p-1 w-full mb-2 font-semibold focus:bg-white"
              type="text"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="
                element.title === ''
                  ? (columns = columns.filter((c) => c.uuid !== element.uuid))
                  : null
              "
            />
          </header>
          <draggable
            v-model="element.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="uuid"
            animation="300"
            handle=".drag-handler"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <TrelloBoardTask
                  :task="task"
                  @delete="
                    element.tasks = element.tasks.filter(
                      (t) => t.uuid !== task.uuid
                    )
                  "
                />
              </div>
            </template>
          </draggable>
          <footer>
            <NewTask @create="element.tasks.push($event)" />
          </footer>
        </section>
      </template>
    </draggable>

    <button
      @click="createColumn"
      class="bg-gray-200 whitespace-nowrap py-1 px-5 rounded opacity-100 hover:opacity-75 transition-opacity"
    >
      + Add column
    </button>
  </section>
</template>

<style scoped>
.scroll-bar-styles {
  scrollbar-width: thin;
  scrollbar-color: rgb(91, 91, 234);
}
</style>
