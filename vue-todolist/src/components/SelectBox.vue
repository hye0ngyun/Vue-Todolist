<script>
export default {
  setup() {},
  data() {
    return {
      title: "Todo List",
      selectTitle: "All",
    };
  },
  methods: {
    selectOption(e) {
      this.selectTitle = e.target.innerText;
      this.$refs.realSelect.value = this.selectTitle;
    },
  },
  mount() {},
};
</script>
<template>
  <div class="bl_selectWrap">
    <select name="" id="" class="bl_realSelectBox hp_hidden" ref="realSelect">
      <option value="All">All</option>
      <option value="Complete">Complete</option>
      <option value="Incomplete">Incomplete</option>
    </select>
    <div class="bl_selectBox">
      <div class="bl_selectBoxItem bl_selecteBoxTitle">
        <span ref="selectTitle">{{ selectTitle }}</span>
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
@import "@/assets/base.css";
.bl_selecteBoxTitle {
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
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
    max-width: 150%;
    width: 100%;
    background-color: #a3f0cd;
    height: 50px;
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
</style>
