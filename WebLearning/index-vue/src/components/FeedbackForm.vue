<template>
  <form class="form" @submit.prevent="handleSubmit">
    <label class="form__label">
      Ваше имя:
      <input class="form__input" v-model="feedback.author" name="author" />
    </label>
    <label class="form__label">
      Ваш отзыв:
      <textarea
        class="form__input"
        v-model="feedback.text"
        name="feedback"
        rows="3"
      />
    </label>
    <button class="form__submit">Отправить</button>
  </form>
</template>

<script>
export default {
  name: "FeedbackForm",
  data() {
    return {
      feedback: {
        author: "",
        text: ""
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("add:feedback", this.feedback);
    }
  }
};
</script>

<style scoped lang="less">
@import "../library.less";
.form {
  width: 300px;
  background: #fff;
  margin: auto auto 30px auto;
  padding: 40px;
  box-shadow: 0 0 10px @black-shadow-light;

  @media @desktop {
    width: 600px;
  }

  &__label {
    display: block;
    margin-bottom: 5px;
  }

  &__input {
    display: inline-block;
    width: 95%;
    // height: 24px;
    margin-bottom: 10px;
    padding: 2px 5px;
    border: 1px solid @black-shadow-light;
  }

  &__submit {
    display: block;
    height: 30px;
    width: auto;
    margin: auto;
    padding: 6px 15px;
    color: white;
    background-color: @darkest_base_color;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:disabled {
      background-color: desaturate(@darkest_base_color, 30%);
      cursor: default;
    }
  }
}
</style>
