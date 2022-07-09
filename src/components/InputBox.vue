<script setup>
import { reactive } from "@vue/reactivity";

const emit = defineEmits(["addList"]);
const state = reactive({
  text: "",
});

const addList = (text) => {
  if (state.text !== "" && state.text !== undefined) {
    // 할 일이 입력된 경우
    emit("addList", state.text);
    state.text = "";
  } else {
    // 할 일이 입력되지 않은 경우
  }
};
</script>

<template>
  <form @submit.prevent="addList" class="bl_inputWrap">
    <input
      class="bl_inputBox"
      type="text"
      placeholder="할 일을 입력하세요"
      v-model="state.text"
      autofocus
    />
    <div class="el_addBtn" @click="addList">
      <img
        src="@/assets/image/add_circle_outline_black_24dp.svg"
        alt="addBtn"
        class="el_img24 el_addBtnImg__green"
      />
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/base.css";
.el_img24 {
  max-width: 24px;
  width: 100%;
  height: auto;
}
.el_addBtn {
  padding: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #e5ebf188;
  transition: 0.15s;
  &:hover {
    background-color: #e5ebf1;
  }
}

.bl_inputWrap {
  display: flex;
  height: 50px;
  .bl_inputBox {
    font-family: "Noto Sans KR", "Roboto", "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    max-width: 550px;
    width: 100%;
    outline: none;
    border: none;
    background-color: #3a3845;
    color: #eee;
    padding-left: 15px;
    font-size: 2rem;
    line-height: 2.8rem;
    border-radius: 0;
  }
  .bl_inputBox::placeholder {
    font-family: "Noto Sans KR", "Roboto", "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    font-size: 2rem;
  }
}
</style>
