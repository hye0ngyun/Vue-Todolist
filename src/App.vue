<script setup>
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import TodoList from "./components/todo-list/TodoList.vue";
import format from "@/lib/utils/format.ts";

const state = reactive({
  date: new Date(),
});
const currHours = computed(() => {
  return state.date.getHours().toString().padStart(2, "0");
});
const currMinutes = computed(() => {
  return state.date.getMinutes().toString().padStart(2, "0");
});
const currSeconds = computed(() => {
  return state.date.getSeconds().toString().padStart(2, "0");
});
setInterval(() => {
  state.date = new Date();
  const hours = state.date.getHours().toString().padStart(2, "0");
  const minutes = state.date.getMinutes().toString().padStart(2, "0");
  const seconds = state.date.getSeconds().toString().padStart(2, "0");
  return `${hours}<span>:</span>${minutes}<span>:</span>${seconds}`;
}, 1000);
</script>

<template>
  <div class="wrap">
    <h2 class="date-wrap">
      <div class="date">
        {{ Intl.DateTimeFormat().format(new Date()) }}
      </div>
      <div class="time">
        {{ `${currHours}:${currMinutes}:${currSeconds}` }}
      </div>
    </h2>
    <TodoList />
  </div>
</template>

<style lang="scss">
body,
html,
#app {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 25px;
}
.date-wrap {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  .date {
    font-size: 3rem;
  }
  .time {
    font-size: 2.5rem;
  }
}
</style>
