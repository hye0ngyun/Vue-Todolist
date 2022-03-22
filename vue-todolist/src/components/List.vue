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
      <label :for="'chk' + obj.id">
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
      <img src="@/assets/image/edit_black_24dp.svg" alt="" class="el_img" />
      <img
        src="@/assets/image/remove_circle_outline_black_24dp.svg"
        alt=""
        class="el_removeBtn el_img"
        @click="removeList"
      />
    </div>
  </li>
</template>

<style lang="scss" scoped>
.hp_hidden {
  display: none;
}
.bl_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
.bl_list:nth-child(2n) {
  background-color: #eeeeee;
}
.bl_contWrap {
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-size: 2rem;
  color: #333;
  gap: 15px;
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
  gap: 24px;
  padding-right: 13px;
}
</style>
