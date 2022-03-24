<script setup>
import { computed, ref } from "vue";
import Header from "./Header.vue";
import InputBox from "./InputBox.vue";
import SearchBox from "./SearchBox.vue";
import SelectBox from "./SelectBox.vue";
import List from "./List.vue";
import UpdatePopup from "./UpdatePopup.vue";

const txt = ref("");
let id = 0;
const todos = ref([
  { id: id++, cont: "JavaScript 공부하기", done: true },
  { id: id++, cont: "Vue.js 공부하기", done: false },
  { id: id++, cont: "운동하기", done: true },
  { id: id++, cont: "책읽기", done: false },
]);
const option = ref("All");
const searchText = ref("");
let searchRegex = ref(new RegExp(searchText.value, "i"));
const filteredTodos = computed(() => {
  // searchText가 입력될때마다 조건에 맞는 결과 보여주기
  // 리스트를 수정한 경우 todos.cont를 업데이트
  todos.value = todos.value.map((t) => {
    if (!!txt.value) {
      t.cont = t.id === updateId.value ? txt.value : t.cont;
    }
    return t;
  });
  searchRegex = ref(new RegExp(`${searchText.value}`, "i"));
  if (option.value === "All") {
    return todos.value.filter((t) => searchRegex.value.test(t.cont));
  } else if (option.value === "Complete") {
    return todos.value.filter((t) => t.done && searchRegex.value.test(t.cont));
  } else if (option.value === "Incomplete") {
    return todos.value.filter((t) => !t.done && searchRegex.value.test(t.cont));
  }
});
const popupBool = ref(false);
const updateId = ref(0);
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
      <ul class="bl_listWrap">
        <List
          v-for="todo in filteredTodos"
          :key="todo.id"
          :obj="todo"
          @removeList="(id) => (todos = todos.filter((t) => t.id !== id))"
          @updateListPopup="
            (id, t) => {
              popupBool = !popupBool;
              updateId = id;
              txt = t;
            }
          "
        />
      </ul>
    </main>
    <transition>
      <UpdatePopup
        v-if="popupBool"
        :popupBool="popupBool"
        :txt="txt"
        @cancelPopup="popupBool = !popupBool"
        @updateList="
          (text) => {
            popupBool = !popupBool;
            txt = text;
          }
        "
      />
    </transition>
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

.bl_todolist {
  max-width: 600px;
  width: 100%;
  max-height: 800px;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px #aaa;
  display: flex;
  flex-direction: column;
}
.bl_filterWrap {
  display: flex;
  border-bottom: 1px solid #42b88355;
}
.bl_listWrap {
  overflow-y: overlay;
  height: 100%;
  scrollbar-gutter: unset;
}
.bl_listWrap::-webkit-scrollbar {
  display: block;
  width: 5px;
  padding: 0;
}
.bl_listWrap::-webkit-scrollbar-thumb {
  width: 5px;
  background-color: #42b883cc;
  border-radius: 100px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .wrap {
    padding: 30px;
  }
}
</style>
