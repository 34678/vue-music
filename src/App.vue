<template>
  <div id="app">

    <m-header></m-header>
    <tab></tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Tab from 'components/tab/tab'
  import MHeader from 'components/m-header/m-header'
export default {
    name: 'app',
    components: {
      MHeader,
      Tab
    }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
