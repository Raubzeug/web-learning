<template>
  <div class="about">
    <Logo />
    <div class="about__description">
      <b>
        This is Foxy's learning portal landing page as a first attempt of using
        Vue.js!
      </b>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/Logo.vue";
export default {
  name: "about",
  components: {
    Logo
  }
};
</script>

<style lang="less" scoped>
@import "../library.less";

.about {
  .flex-wrap;
  background: linear-gradient(to top, @dark_base_color, white);
  justify-content: flex-start;
  margin-top: 10px;

  &__description {
    flex-grow: 1;
    text-align: center;
    font-size: @font-size-headers;
  }
}
</style>
