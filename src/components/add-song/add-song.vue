<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <!--搜索框部分-->
      <div class="search-box-wrapper">
        <search-box ref="searchBox" placeholder="搜索歌曲" @query="onQueryChange"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll ref="songList" :data="playHistory">
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong">

              </song-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest @listscroll="blurInput" :query="query" :showSinger="showSinger" @select="selectSuggest"></suggest>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import {searchMixin} from 'common/js/mixin'
  import Switches from 'base/switches/switches'
  import {mapGetters, mapActions} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import SearchList from 'base/search-list/search-list'
  import SongList from 'base/song-list/song-list'
  import Song from 'common/js/song'

  export default {
    computed: {
      ...mapGetters([
        'playHistory'
      ])
    },
    mixins: [searchMixin],
    components: {
      SongList,
      SearchBox,
      Suggest,
      Switches,
      Scroll,
      SearchList
    },
    data() {
      return {
        showFlag: false,
        showSinger: false,
        switches: [
          {
            name: '最近播放'
          },
          {
            name: '搜索历史'
          }
        ],
        currentIndex: 0
      }
    },
    methods: {
      ...mapActions([
        'insertSong'
      ]),
      selectSong(song, index) {
        // 因为第一个已经在当前的播放列表里面？
        if (!index !== 0) {
          // 存的时候是song对象 拿出来的时候属性还在 但是已经不是song对象
          this.insertSong(new Song(song))
        }
      },
      switchItem(index) {
        this.currentIndex = index
      },
      selectSuggest() {
        this.saveSearch()
      },
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>
