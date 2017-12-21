<template>
  <transition name="slide">
    <div class="singer-detail">
      aaaa
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'

  export default {
    name: 'singer-detail',
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
    },
    data() {
      return {
        songs: []
      }
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.singer.id = 'this.singer.id'
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
            console.log(this.songs)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .singer-detail
    position: fixed
    z-index: 100
    left: 0
    right: 0
    top: 0
    bottom: 0
    background: black
    color: white
</style>
