<template>
  <div class="review">
    <blockquote class="review__blockquote">
      <p class="review__blockquote_content">
        {{ review.text }}
      </p>
      <footer class="review__blockquote_footer">
        — <cite>{{ review.author }}</cite>
      </footer>
    </blockquote>
  </div>
</template>

<script>
export default {
  name: "Review",
  props: {
    review: Object
  }
};
</script>

<style scoped lang="less">
@import "../library.less";

.review {
  vertical-align: top;
  background-color: @base_color_light;
  display: inline-block;
  padding: 1%;

  &__blockquote {
    margin: 0;
    color: @light-black-text;
    padding: 10px 40px;
    border-left: 8px solid @base_color;
    position: relative;
    background: @quote-background;

    &:before {
      content: "\201C";
      color: @base_color;
      font-size: @font-size-main * 3;
      position: absolute;
      left: 10px;
      top: 0;
    }

    &_content {
      font-style: italic;
      margin-top: 0;
    }

    &_footer {
      font-style: italic;
      margin-top: 0;
      text-align: right;
    }
  }
}
</style>
