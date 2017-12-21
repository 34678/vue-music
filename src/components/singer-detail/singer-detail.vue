<template>
  <transition name="slide">
  <div  class="singer-detail">
             aaaa
  </div>
  </transition>
</template>

<script>
  export default {
    name: 'singer-detail'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .singer-detail
    position:fixed
    z-index:100
    left:0
    right:0
    top:0
    bottom:0
    background:black
    color:white
</style>
