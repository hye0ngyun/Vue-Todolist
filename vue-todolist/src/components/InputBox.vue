<script>
export default {
  setup() {},
  data() {
    return {
      title: "Todo List",
    };
  },
};
</script>
<template>
  <div class="bl_inputWrap">
    <input class="bl_inputBox" type="text" placeholder="할 일을 입력하세요" />
    <div class="el_addBtn">
      <img
        src="@/assets/image/add_circle_outline_black_24dp.svg"
        alt="addBtn"
        class="el_img24 el_addBtnImg__green"
      />
    </div>
  </div>
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
  background-color: #eeeeee;

  .el_addBtnImg__green {
    filter: invert(58%) sepia(54%) saturate(452%) hue-rotate(101deg)
      brightness(97%) contrast(86%);
  }
}
.bl_inputWrap {
  display: flex;
  height: 50px;
  .bl_inputBox {
    max-width: 550px;
    width: 100%;
    outline: none;
    border: none;
    background-color: #333333;
    color: #fff;
    padding-left: 15px;
    font-size: 2rem;
  }
  .bl_inputBox::placeholder {
    font-size: 2rem;
  }
}
</style>
