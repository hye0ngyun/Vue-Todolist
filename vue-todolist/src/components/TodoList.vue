<script setup>
import { computed, ref } from "vue";
import Header from "./Header.vue";
import InputBox from "./InputBox.vue";
import SearchBox from "./SearchBox.vue";
import SelectBox from "./SelectBox.vue";
import List from "./List.vue";

const cont = ref("");
let id = 0;
const todos = ref([
  { id: id++, cont: "test1", done: false },
  { id: id++, cont: "JavaScript 공부하기", done: true },
]);
const option = ref("All");
const searchText = ref("");
let searchRegex = ref(new RegExp(searchText.value, "i"));
const filteredTodos = computed(() => {
  // searchText가 입력될때마다 조건에 맞는 결과 보여주기
  searchRegex = ref(new RegExp(`${searchText.value}`, "i"));
  if (option.value === "All") {
    return todos.value.filter((t) => searchRegex.value.test(t.cont));
  } else if (option.value === "Complete") {
    return todos.value.filter((t) => t.done && searchRegex.value.test(t.cont));
  } else if (option.value === "Incomplete") {
    return todos.value.filter((t) => !t.done && searchRegex.value.test(t.cont));
  }
});
</script>
<template>
  <div class="wrap">
    <main class="bl_todolist">
      <Header />
      <InputBox
        :todos="todos"
        @addList="(msg) => todos.push({ id: id++, cont: msg, done: false })"
      />
      <div class="bl_filterWrap">
        <SearchBox @searchInput="(txt) => (searchText = txt)" />
        <SelectBox @selectOption="(opt) => (option = opt)" />
      </div>
      <ul>
        <List
          v-for="todo in filteredTodos"
          :key="todo.id"
          :obj="todo"
          @removeList="(id) => (todos = todos.filter((t) => t.id !== id))"
        />
      </ul>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 50px;
}
@media (max-width: 768px) {
  .wrap {
    padding: 30px;
  }
}
.bl_todolist {
  max-width: 600px;
  width: 100%;
  max-height: 800px;
  height: 100%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 0px #aaa;
}
.bl_filterWrap {
  display: flex;
  border-bottom: 1px solid #42b883;
}
</style>
