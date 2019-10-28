<template>
  <div class="body-wrapper">
    <div class="router_navigation">
      <router-link class="router_link" to="/">Home</router-link>|
      <router-link class="router_link" to="/#anchore1">Courses</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
@import "library.less";
.body-wrapper {
  .flex-column;
  justify-content: space-between;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: "Open Sans", sans-serif;
  font-size: @font-size-main;
}

.router_navigation {
  background: #ffffff;
  text-align: center;
  margin: 10px 0;
  position: sticky;
  top: 0;
}

.router_link {
  .non-decorated-link;
  font-weight: bold;

  :hover {
    color: @black;
  }
}
</style>
