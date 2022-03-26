<script setup>
import { computed, onMounted, ref, watch } from "vue";
import Header from "./Header.vue";
import InputBox from "./InputBox.vue";
import SearchBox from "./SearchBox.vue";
import SelectBox from "./SelectBox.vue";
import List from "./List.vue";
import UpdatePopup from "./UpdatePopup.vue";

const txt = ref("");
let id = 0;
const todos = ref([]);
const option = ref("All");
const searchText = ref("");
let searchRegex = ref(new RegExp(searchText.value, "i"));
const filteredTodos = computed(() => {
  // searchText가 입력될때마다 조건에 맞는 결과 보여주기
  // 리스트를 수정한 경우 todos.cont를 업데이트
  let idCnt = 0;
  todos.value.forEach((t) => {
    t.id = idCnt++;
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
// todos 값이 변경된 경우 함수 실행
// watch(todos, (e) => {
//   // console.log(e);
// });
// watch(todos, () => {
//   // todos.value.forEach((t) => {
//   //   console.log(t.done);
//   // });
// });
const popupBool = ref(false);
const updateId = ref(0);
onMounted(() => {
  // localStorage를 이용해 브라우저에 todos 값 저장
  const localTodos = !JSON.parse(localStorage.getItem("todos"))
    ? JSON.parse("[]")
    : JSON.parse(localStorage.getItem("todos"));
  const localId = localTodos.length;
  id = localId;
  todos.value = localTodos;
});
function add(msg) {
  todos.value.push({ id: id++, cont: msg, done: false });
  localStorage.setItem("todos", JSON.stringify(todos.value));
}
function remove(id) {
  todos.value = todos.value.filter((t) => t.id !== id);
  localStorage.setItem("todos", JSON.stringify(todos.value));
}
function update(msg) {
  popupBool.value = !popupBool.value;
  txt.value = msg;
  todos.value = todos.value.map((t) => {
    if (!!txt.value) {
      t.cont = t.id === updateId.value ? txt.value : t.cont;
      localStorage.setItem("todos", JSON.stringify(todos.value));
    }
    return t;
  });
}
function check(id, done) {
  todos.value.forEach((t) => {
    t.done = t.id === id ? done : t.done;
  });
  localStorage.setItem("todos", JSON.stringify(todos.value));
}
</script>
<template>
  <div class="wrap">
    <main class="bl_todolist">
      <Header />
      <InputBox :todos="todos" @addList="add" />
      <div class="bl_filterWrap">
        <SearchBox @searchInput="(txt) => (searchText = txt)" />
        <SelectBox @selectOption="(opt) => (option = opt)" />
      </div>
      <ul class="bl_listWrap">
        <List
          v-for="todo in filteredTodos"
          :key="todo.id"
          :obj="todo"
          @removeList="remove"
          @updateListPopup="
            (id, t) => {
              popupBool = !popupBool;
              updateId = id;
              txt = t;
            }
          "
          @checkList="check"
        />
      </ul>
    </main>
    <transition>
      <UpdatePopup
        v-if="popupBool"
        :popupBool="popupBool"
        :txt="txt"
        @cancelPopup="popupBool = !popupBool"
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
