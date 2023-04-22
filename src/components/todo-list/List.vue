<script setup>
import { reactive } from "@vue/reactivity";
import format from "@/lib/utils/format.ts";
import { onMounted } from "vue";

const props = defineProps({
  obj: Object,
});
const emit = defineEmits(["removeList", "updateListPopup", "checkList"]);
const state = reactive({});

// method
const removeList = () => {
  emit("removeList", props.obj.id);
};
const updateListPopup = () => {
  emit("updateListPopup", props.obj.id, props.obj.cont);
};
const checkList = () => {
  props.obj.done = !props.obj.done;
  emit("checkList", props.obj.id, props.obj.done);
};
</script>

<template>
  <li class="bl_list">
    <div class="bl_date-wrap">
      <div class="bl_date start">
        <div class="date">{{ format.d(obj?.date) }}</div>
        <div class="time">{{ format.t(obj?.date) }}</div>
      </div>
      <div class="bl_date end">
        <div class="date">{{ format.d(obj?.date) }}</div>
        <div class="time">{{ format.t(obj?.date) }}</div>
      </div>
    </div>
    <div class="bl_contWrap">
      <input
        type="checkbox"
        name=""
        :id="'chk' + obj.id"
        class="hp_hidden"
        @click="checkList"
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
.bl_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #eee;
  position: relative;
  &:nth-child(2n) {
    background-color: #f8f9fa;
  }
  &:last-child {
    .bl_date-wrap {
      border-bottom: unset;
    }
  }

  .bl_date-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    border-bottom: 1px solid #eee;

    /* align-items: flex-end; */
    position: absolute;
    /* border-radius: 20px 0 0 20px; */
    font-size: 1.3rem;
    width: 100px;
    height: 50px;
    background-color: azure;
    left: -100px;
    .bl_date {
      display: flex;
      flex-direction: column;
      gap: 5px;
      justify-content: center;
    }
    &::after {
      content: "";
      width: 1px;
      height: 50px;
      background-color: #eee;
      position: absolute;
    }
  }
}
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
  color: #111;
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
  max-width: 100px;
  width: 100%;
  height: 100%;
}
</style>
