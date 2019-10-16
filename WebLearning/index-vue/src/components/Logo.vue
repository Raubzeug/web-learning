<template>
  <a href="/" class="logo" title="На главную">
    <img class="logo__pic" v-bind:src="logo" alt="logo" />
  </a>
</template>

<script>
import logo_pic from "../images/logo.png";
export default {
  name: "logo",
  data() {
    return {
      logo: logo_pic
    };
  }
};
</script>

<style scoped lang="less">
@import "../library.less";

.logo {
  display: block;
  min-width: 15%;

  &__pic {
    max-width: 100px;
  }
}
</style>
