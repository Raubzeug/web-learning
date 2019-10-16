<template>
  <div class="footer-wrapper">
    <div class="footer">
      ПОДВАЛ
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style lang="less" scoped>
@import "../library.less";
.footer-wrapper {
  .flex-column;
  width: 100%;
  position: fixed;
  bottom: 0;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 0;
  padding: 20px 0 10px 0;
  background-color: @base_color;
}
</style>
