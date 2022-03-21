<script setup>
import Header from "./Header.vue";
import InputBox from "./InputBox.vue";
import SearchBox from "./SearchBox.vue";
import SelectBox from "./SelectBox.vue";
import List from "./List.vue";
// export default {
//   data() {
//     return { greeting: "helloWorld" };
//   },
// };
const cont = "helloWorld!";
let id = 0;
let todos = [
  { id: id++, cont: cont, done: false },
  { id: id++, cont: "JavaScript 공부하기", done: true },
];
console.log(todos);
</script>
<template>
  <div class="wrap">
    <main class="bl_todolist">
      <Header />
      <InputBox />
      <div class="bl_filterWrap">
        <SearchBox />
        <SelectBox />
      </div>
      <ul>
        <List
          v-for="todo in todos"
          :key="todo.id"
          :cont="todo.cont + todo.done"
          :done="todo.done"
          :idNum="todo.id"
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
