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
  <header class="bl_header">
    <span>{{ title }}</span>
  </header>
</template>

<style scoped lang="scss">
.bl_header {
  background-color: #42b883;
  width: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-radius: 5px 5px 0 0;
  font-weight: 700;
  font-size: 2.4rem;
}
</style>
