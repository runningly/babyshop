<template>
  <div id="app">

    <router-view />
    <tabBar />
  </div>
</template>

<script>
import TabBar from "./components/common/TabBar";
export default {
  components: {
    TabBar,
  },
}
</script>

<style lang="stylus"></style>
