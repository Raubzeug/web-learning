<template>
  <div class="company">
    <a class="company-logo" href="/#">
      <img v-bind:src="partner.img" v-bind:alt="partner.name" />
    </a>
    <div class="company-name">
      {{ partner.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Partner",
  props: {
    partner: Object
  }
};
</script>

<style scoped lang="less">
@import "../library.less";

.company {
  display: flex;
  max-width: 200px;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  text-align: center;

  &-logo img {
    max-width: 60px;
  }
}
</style>
