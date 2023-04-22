<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import Header from "./Header.vue";
import InputBox from "./InputBox.vue";
import SearchBox from "./SearchBox.vue";
import SelectBox from "./SelectBox.vue";
import List from "./List.vue";
import UpdatePopup from "../UpdatePopup.vue";

// variable
let id = 0;

// state
const state = reactive({
  txt: "",
  todos: [],
  option: "All",
  searchText: "",
  searchRegex: new RegExp("", "i"),
  popupBool: false,
  updateId: 0,
});

// computed
const filteredTodos = computed(() => {
  // searchText가 입력될때마다 조건에 맞는 결과 보여주기
  // 리스트를 수정한 경우 todos.cont를 업데이트
  let idCnt = 0;
  state.todos.forEach((t) => {
    t.id = idCnt++;
  });

  state.searchRegex = ref(new RegExp(`${state.searchText}`, "i"));
  if (state.option === "All") {
    return state.todos.filter((t) => state.searchRegex.test(t.cont));
  } else if (state.option === "Complete") {
    return state.todos.filter((t) => t.done && state.searchRegex.test(t.cont));
  } else if (state.option === "Incomplete") {
    return state.todos.filter((t) => !t.done && state.searchRegex.test(t.cont));
  }
});

// method
const add = (msg) => {
  state.todos.push({ id: id++, cont: msg, done: false, date: new Date() });
  setLocalStorage();
};
const remove = (id) => {
  state.todos = state.todos.filter((t) => t.id !== id);
  setLocalStorage();
};
const update = (msg) => {
  state.popupBool = !state.popupBool;
  state.txt = msg;
  state.todos = state.todos.map((t) => {
    if (!!state.txt) {
      t.cont = t.id === state.updateId ? state.txt : t.cont;
      setLocalStorage();
    }
    return t;
  });
};
const check = (id, done) => {
  state.todos.forEach((t) => {
    t.done = t.id === id ? done : t.done;
  });
  setLocalStorage();
};
const setLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(state.todos));
};

// lifecycle
onMounted(() => {
  // localStorage를 이용해 브라우저에 todos 값 저장
  const localTodos = JSON.parse(localStorage.getItem("todos"))
    ? JSON.parse(localStorage.getItem("todos"))
    : JSON.parse("[]");
  const localId = localTodos.length;
  id = localId;
  state.todos = localTodos;
});
</script>
<template>
  <div class="wrap">
    <main class="bl_todolist">
      <Header />
      <InputBox :todos="state.todos" @addList="add" />
      <div class="bl_filterWrap">
        <SearchBox @searchInput="(txt) => (state.searchText = txt)" />
        <SelectBox @selectOption="(opt) => (state.option = opt)" />
      </div>
      <ul class="bl_listWrap">
        <List
          v-for="todo in filteredTodos"
          :key="todo.id"
          :obj="todo"
          @removeList="remove"
          @updateListPopup="
            (id, t) => {
              state.popupBool = !state.popupBool;
              state.updateId = id;
              state.txt = t;
            }
          "
          @checkList="check"
        />
      </ul>
    </main>
    <transition>
      <UpdatePopup
        v-if="state.popupBool"
        :popupBool="state.popupBool"
        :text="state.txt"
        @cancelPopup="state.popupBool = !state.popupBool"
        @updateList="update"
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
  /* overflow-y: overlay; */
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
