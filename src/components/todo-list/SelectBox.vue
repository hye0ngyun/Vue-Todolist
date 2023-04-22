<script setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const emit = defineEmits(["selectOption"]);
const state = reactive({
  selectTitle: "All",
});

// ref - DOM Select
const realSelect = ref(null);

// method
const selectOption = (e) => {
  state.selectTitle = e.target.innerText;
  realSelect.value = state.selectTitle;
  emit("selectOption", state.selectTitle);
};
</script>
<template>
  <div class="bl_selectWrap">
    <select name="" id="" class="bl_realSelectBox hp_hidden" ref="realSelect">
      <option value="All" selected>All</option>
      <option value="Complete">Complete</option>
      <option value="Incomplete">Incomplete</option>
    </select>
    <div class="bl_selectBox">
      <div class="bl_selectBoxItem bl_selecteBoxTitle">
        <span ref="selectTitle">{{ state.selectTitle }}</span>
        <img
          src="@/assets/image/arrow_drop_down_black_24dp.svg"
          alt="dropdown_arrow"
        />
      </div>
      <div class="bl_selectBoxItemWrap">
        <div class="bl_selectBoxItem" @click="selectOption">All</div>
        <div class="bl_selectBoxItem" @click="selectOption">Complete</div>
        <div class="bl_selectBoxItem" @click="selectOption">Incomplete</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bl_selecteBoxTitle {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  flex-shrink: 5;
}
.bl_selectWrap {
  width: 100%;
  max-width: 150px;
}
.hp_hidden {
  display: none;
}
.bl_selectBox {
  max-width: 150px;
  width: 100%;
  font-size: 2rem;
  outline: none;
  .bl_selectBoxItem {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 10px;
    // max-width: 150px;
    width: 100%;
    background-color: #42b883cc;
    height: 50px;
    color: #111;
    transition: 0.15s;
  }
  .bl_selectBoxItem:hover {
    background-color: #42b883;
    color: #fff;
  }
  .bl_selectBoxItemWrap {
    visibility: hidden;
    position: absolute;
    width: 100%;
    max-width: 150px;
    opacity: 0;
    transition: 0.15s;
  }
}
.bl_selectBox:hover {
  .bl_selectBoxItemWrap {
    visibility: visible;
    opacity: 1;
  }
}
@media (max-width: 768px) {
  .bl_selectWrap {
    max-width: 120px;
  }
  .bl_selectBox {
    // max-width: 100px;
    .bl_selectBoxItemWrap {
      max-width: 120px;
    }
  }
}
</style>
