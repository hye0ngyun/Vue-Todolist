<script setup>
import { reactive, ref } from "@vue/reactivity";

const emit = defineEmits(["updateList"]);
const props = defineProps({
  popupBool: Boolean,
  updateText: String,
  text: String,
});

const state = reactive({});

// method
const updateList = () => {
  emit("updateList", props.text);
};
</script>

<template>
  <div class="bl_popupWrap">
    <form class="bl_popup" @submit.prevent="updateList">
      <div class="bl_popupTtl">수정하기</div>
      <input type="text" class="el_input" v-model="text" autofocus />
      <div class="bl_btnWrap">
        <div class="el_btn" @click="updateList">수정</div>
        <div class="el_btn" @click="this.$emit('cancelPopup')">취소</div>
      </div>
    </form>
    <div class="backdrop" @click="this.$emit('cancelPopup')"></div>
  </div>
</template>

<style lang="scss" scoped>
.bl_popupWrap {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.bl_popupWrap.js_active {
  visibility: visible;
  opacity: 1;
}
.backdrop {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000a;
  top: 0;
  left: 0;
}
.bl_popup {
  width: 300px;
  height: 200px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  z-index: 1;
  .bl_popupTtl {
    width: 100%;
    height: 50px;
    background-color: #42b883;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 2rem;
    border-radius: 5px 5px 0 0;
  }
  .el_input {
    outline: none;
    border: none;
    border-bottom: 2px solid #42b883aa;
    padding: 5px;
    width: 70%;
    transition: 0.15s;
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-family: "Noto Sans KR";
    color: #111;
  }
  .el_input:hover,
  .el_input:focus {
    border-bottom: 2px solid #42b883;
  }
  .bl_btnWrap {
    display: flex;
    gap: 15px;
    justify-content: center;
    .el_btn {
      border: none;
      background-color: unset;
      padding: 5px 15px;
      transition: 0.15s;
      cursor: pointer;
      font-size: 1.6rem;
    }
    .el_btn:first-child {
      background-color: #42b883cc;
      color: #fff;
    }
    .el_btn:first-child:hover {
      background-color: #42b883;
    }
    .el_btn:last-child {
      background-color: #aaac;
      color: #fff;
    }
    .el_btn:last-child:hover {
      background-color: #aaa;
    }
  }
}
</style>
