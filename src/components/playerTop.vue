<template lang="html">
  <div class="relative-player">
      <div class="player container">
        <div class="container size margin justify-content-between align-items-center">

          <div class="flex-basis-100 box">
            <div class="box-music container justify-content-start align-items-center">
              <div class="box-music-img">

              </div>
              <div class="box-music-title">
                <h1>Music</h1>
                <p>Author</p>
              </div>
            </div>
          </div>

          <div class="flex-basis-100 box container justify-content-center align-items-center">

            <div class="player-btn player-btn-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-back"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            </div>

            <div class="player-btn player-btn-play" v-show="!isPlay" v-cloak @click="togglePlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
            </div>

            <div class="player-btn player-btn-play" v-show="isPlay" v-cloak @click="togglePlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause-circle"><circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line></svg>
            </div>

            <div class="player-btn player-btn-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-forward"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
            </div>

          </div>

          <div class="flex-basis-100 box container justify-content-center align-items-center hide">

            <div class="player-btn player-btn-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </div>

            <div class="percent-vol">
              <div class="vol">

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isPlay: false
    }
  },
  methods: {
    togglePlay: function () {
      this.isPlay = !this.isPlay
    }
  }
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0
}
.size {
  width: 1400px;
  max-width: 95%;
}
.margin {
  margin: 0 auto!important
}
.relative-player {
  position: relative;
  height: 150px;
}
.player {
  height: 100px;
  background: #2B2836;
  position: fixed;
  bottom: 0;
  width: 100vw;
}
.box {
  /*border: 1px solid red;*/
}
.box-music .box-music-img {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  background: #403D4A;
  margin-right: 10px;
}
.box-music .box-music-title {
  color: #fff
}
.box-music .box-music-title h1 {
  font-size: 1rem;
  font-weight: 900
}
.box-music .box-music-title p {
  font-size: .7rem;
  font-weight: 100
}
.percent-vol {
  height: 4px;
  width: 130px;
  background: #ccc;
  margin-left: 5px;
  border-radius: 4px;
}
.player-btn {
  cursor: pointer;
  transition: .1s all
}
@media screen and (max-width: 480px) {
  .hide {
    display: none
  }
}
</style>
