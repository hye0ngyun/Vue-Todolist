<script>
export default {
  setup() {},
  data() {
    return {
      text: "",
      id: 2,
    };
  },
  computed: {
    // id() {
    //   return idNum;
    // },
  },
  emits: ["addList"],
  props: {
    todos: {
      id: Number,
      cont: String,
      done: Boolean,
    },
    idNum: Number,
  },
  methods: {
    addList(e) {
      if (this.text !== "" && this.text !== undefined) {
        // 할 일이 입력된 경우
        this.$emit("addList", this.text);
        this.text = "";
      } else {
        // 할 일이 입력되지 않은 경우
      }
    },
  },
};
</script>

<template>
  <form @submit.prevent="addList" class="bl_inputWrap">
    <input
      class="bl_inputBox"
      type="text"
      placeholder="할 일을 입력하세요"
      v-model="text"
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
  background-color: #eeeeee;
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
