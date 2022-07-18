<script setup>
import { reactive } from "@vue/reactivity";

const state = reactive({
  searchText: "",
});
</script>

<template>
  <div class="bl_searchWrap">
    <input
      class="bl_searchBox"
      type="text"
      placeholder="검색어를 입력하세요"
      v-model="state.searchText"
      @input="this.$emit('searchInput', state.searchText)"
    />
    <img
      src="@/assets/image/search_black_24dp.svg"
      alt="addBtn"
      class="el_beforeImg"
    />
  </div>
</template>

<style scoped lang="scss">
.el_img24 {
  max-width: 24px;
  width: 100%;
  height: auto;
}
.el_beforeImg {
  // margin-left: 15px;
  // margin-right: 10px;
  position: absolute;
  left: 13px;
  top: 13px;
  pointer-events: none;
}
.bl_searchWrap {
  position: relative;
  // max-width: 450px;
  width: 100%;
  flex-shrink: 1;
  .bl_searchBox {
    font-family: "Noto Sans KR", "Roboto", "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    display: flex;
    max-width: 450px;
    height: 50px;
    width: 100%;
    outline: none;
    border: none;
    background-color: #ffffff;
    color: #111;
    font-size: 2rem;
    line-height: 2.8rem;
    padding-left: 50px;
    border-radius: 0;
  }
  .bl_searchBox::placeholder {
    font-family: "Noto Sans KR", "Roboto", "Gill Sans", "Gill Sans MT", Calibri,
      "Trebuchet MS", sans-serif;
    font-size: 2rem;
    line-height: 2.8rem;
  }
}
</style>
