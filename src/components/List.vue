<script>
export default {
  // data() {
  //   return;
  // },
  props: {
    // cont: String,
    // done: Boolean,
    // idNum: Number,
    obj: Object,
  },
  methods: {
    removeList(e) {
      this.$emit("removeList", this.obj.id);
    },
    updateListPopup() {
      this.$emit("updateListPopup", this.obj.id, this.obj.cont);
    },
  },
};
</script>

<template>
  <li class="bl_list">
    <div class="bl_contWrap">
      <input
        type="checkbox"
        name=""
        :id="'chk' + obj.id"
        class="hp_hidden"
        v-model="obj.done"
      />
      <label :for="'chk' + obj.id" class="el_label">
        <img
          src="@/assets/image/checkbox_t.svg"
          alt=""
          class="el_img"
          v-if="obj.done"
        />
        <img src="@/assets/image/checkbox_f.svg" alt="" class="el_img" v-else />
      </label>
      <span class="bl_cont bl_cont__done" v-if="obj.done">{{
        obj.cont || "props not passed"
      }}</span>
      <span class="bl_cont" v-else>{{ obj.cont || "props not passed" }}</span>
    </div>

    <div class="bl_imgWrap">
      <div class="el_btn" @click="updateListPopup">
        <img src="@/assets/image/edit_black_24dp.svg" alt="" class="el_img24" />
      </div>
      <div class="el_btn" @click="removeList">
        <img
          src="@/assets/image/remove_circle_outline_black_24dp.svg"
          alt=""
          class="el_removeBtn el_img24"
        />
      </div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.el_img24 {
  max-width: 24px;
  width: 100%;
  height: auto;
}
.el_btn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.15s;
  background-color: #e5ebf188;
  &:hover {
    background-color: #e5ebf1;
  }
}
.hp_hidden {
  display: none;
}
.bl_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eee;
  &:nth-child(2n) {
    background-color: #f8f9fa;
  }
}
.el_label {
  display: flex;
  align-items: center;
  justify-content: center;
}
.bl_contWrap {
  display: flex;
  align-items: center;
  padding-left: 15px;
  gap: 15px;
  overflow: hidden;
  // text-overflow: ellipsis;
  // white-space: nowrap;
}
.bl_cont {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 2rem;
  line-height: 2.8rem;
  color: #333;
}
.bl_cont__done {
  text-decoration: line-through;
  color: #aaa;
}
.el_img {
  cursor: pointer;
}
.bl_imgWrap {
  display: flex;
  // gap: 24px;
  // padding-right: 13px;
  max-width: 100px;
  width: 100%;
  height: 100%;
}
</style>
