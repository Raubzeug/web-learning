<template>
  <div class="body-wrapper">
    <About />
    <section class="content">
      <div class="content__column">
        <div class="content__header" id="anchore1">Популярные курсы</div>
        <Courses v-bind:courses="courses" />
      </div>
      <div class="content__line background-light">
        <div class="content__header" id="anchore2">Отзывы наших студентов</div>
        <Review
          v-for="review in reviews"
          v-bind:review="review"
          v-bind:key="review.id"
        />
      </div>
      <div class="content__line">
        <div class="content__header" id="anchore3">Наши партнеры</div>
        <Partner
          v-for="partner in partners"
          v-bind:partner="partner"
          v-bind:key="partner.id"
        />
      </div>
      <div class="content__line background-light">
        <div class="content__header" id="anchore4">Оставьте отзыв</div>
        <FeedbackForm @add:feedback="addFeedback" />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import About from "@/components/About.vue";
import Footer from "@/components/Footer.vue";
import Courses from "@/components/Courses.vue";
import Review from "@/components/Review.vue";
import Partner from "@/components/Partner.vue";
import FeedbackForm from "@/components/FeedbackForm.vue";

import Pic1 from "../images/python-1.png";
import Pic2 from "../images/css-1.png";
import Pic3 from "../images/js.png";
import Wolf from "../images/wolf.png";
import Rabbit from "../images/rabbit.png";
import Bear from "../images/bear.png";
export default {
  name: "home",
  components: {
    Footer,
    Courses,
    About,
    Review,
    Partner,
    FeedbackForm
  },
  data() {
    return {
      courses: [
        {
          id: 1,
          name: "Web разработка на Python",
          lang: "Python",
          img: Pic1,
          caption: "Много всего интересного про язык программирования Python",
          url: "/courses/python-1.html"
        },
        {
          id: 2,
          name: "Верстка с помощью CSS",
          lang: "CSS",
          img: Pic2,
          caption: `Всякая разная информация о верстке с помощью CSS и еще всякая
          разная информация и еще и еще и еще чтобы проверить, как верстается карточка курса.`,
          url: "/courses/css-1.html"
        },
        {
          id: 3,
          name: "Не бойтесь JavaScript!",
          lang: "CSS",
          img: Pic3,
          caption: `Все чего вы не знали о JavaScript, но боялись спросить!`,
          url: "/courses/js-1.html"
        }
      ],
      reviews: [
        { id: 1, text: "Супер!", author: "Елена" },
        { id: 2, text: "Отлично!", author: "Елена" },
        {
          id: 3,
          text: "Отзыв немного подлинее, чтобы проверить форматирование!",
          author: "Елена"
        },
        {
          id: 4,
          text: "Отзыв немного подлинее, чтобы проверить форматирование!",
          author: "Елена"
        }
      ],
      partners: [
        { id: 1, name: 'АО "Волчий софт"', img: Wolf },
        {
          id: 2,
          name: 'Государственная корпорация "Зайцы-тестировщики"',
          img: Rabbit
        },
        { id: 3, name: 'Студия "Дизайн от медведя Семена"', img: Bear }
      ]
    };
  },
  methods: {
    addFeedback(feedback) {
      console.log(feedback);
      // fetch axios etc
    }
  }
};
</script>

<style lang="less">
@import "../library.less";

.body-wrapper {
  .flex-column;
}

.content {
  .flex-column;
  text-align: center;

  margin-bottom: 40px;

  &__column {
    .flex-column;
    flex-grow: 1;
  }

  &__line {
    .flex-wrap;
    justify-content: center;
  }

  &__header {
    padding: 10px;
    width: 100%;
    flex-grow: 1;
    font-size: @font-size-headers;
    font-weight: bold;
  }
}

.background-light {
  background: @base_color_light;
}
</style>
