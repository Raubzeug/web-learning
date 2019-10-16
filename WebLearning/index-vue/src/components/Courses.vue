<template>
  <div class="courses">
    <article class="course" v-for="course in courses" :key="course.id">
      <h1 class="course-heading">{{ course.name }}</h1>
      <div class="course-meta">
        <div class="course-category">
          <span class="course-icon course-tag">Категория: </span>
          <span>{{ course.lang }}</span>
        </div>
      </div>
      <div class="course-content">
        <figure class="course-figure">
          <img
            class="course-img"
            v-bind:src="course.img"
            v-bind:alt="course.lang"
          />
          <figcaption>
            <p>{{ course.caption }}</p>
          </figcaption>
        </figure>
        <a class="course-info-button" v-bind:href="course.url">
          Информация о курсе
        </a>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "courses",
  props: {
    courses: Array
  }
};
</script>
<style lang="less" scoped>
@import "../library.less";

.courses {
  .flex-wrap;
  justify-content: space-around;
  flex-grow: 1;
}

.course {
  .flex-column;
  margin: 10px;
  padding: 10px;
  flex-basis: 300px;
  max-width: 400px;
  flex-grow: 1;

  &-meta {
    display: flex;
  }

  &-img {
    max-width: 100px;
    margin: 10px 0;
  }

  &-content {
    .flex-column;
    flex-grow: 1;
  }

  &-figure {
    text-align: center;
    padding-bottom: 10px;
    margin-top: auto;
    margin-bottom: auto;
  }

  &-figure p {
    text-align: left;
  }

  &-info-button {
    .non-decorated-link(@light-black-text);
    display: block;
    margin-top: auto;
    flex-shrink: 0;
    padding: 5px 10px;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
    background: white;
    border: none;
    background-image: @gradient-gray;
    box-shadow: @gray-button-shadow;
    text-shadow: 0 1px 1px white;
    cursor: pointer;
  }
}
</style>
