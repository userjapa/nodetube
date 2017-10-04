<template lang="html">
  <div>

    <div class="relative-player">

      <div class="player container column space">
        <div class="timer">
          <input class="time" type="range" min="0" :max="duration" v-model="currentTime" @change="changeTime(currentTime)">
        </div>

        <div class="container size margin justify-content-between align-items-center space">

          <div class="flex-basis-100 box">
            <div class="box-music container justify-content-start align-items-center">
              <div class="box-music-img">
                <img :src="play.img" class="box-music-img">
              </div>
              <div class="box-music-title">
                <h1>{{play.name}}</h1>
                <p>Author</p>
              </div>
            </div>
          </div>

          <div class="flex-basis-100 box container justify-content-center align-items-center">

            <div class="player-btn player-btn-play" @click="playPrevious">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-back"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line></svg>
            </div>

            <div class="player-btn player-btn-play" v-show="!isPlay" v-cloak @click="togglePlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
            </div>

            <div class="player-btn player-btn-play" v-show="isPlay" v-cloak @click="togglePlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause-circle"><circle cx="12" cy="12" r="10"></circle><line x1="10" y1="15" x2="10" y2="9"></line><line x1="14" y1="15" x2="14" y2="9"></line></svg>
            </div>

            <div class="player-btn player-btn-play" @click="playNext">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-skip-forward"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
            </div>
          </div>

          <div class="flex-basis-100 box container justify-content-center align-items-center hide">
            <div class="box">
              <div class="player-btn player-btn-play" @click="auto">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 51.4 51.4" style="enable-background:new 0 0 51.4 51.4;" xml:space="preserve" width="24" height="24">
                    <g>
                      <path d="M1.7,25.2c0.553,0,1-0.447,1-1c0-6.065,4.935-11,11-11h24v8.964L51.4,12.2L37.7,2.236V11.2h-24c-7.168,0-13,5.832-13,13   C0.7,24.753,1.147,25.2,1.7,25.2z M39.7,6.164L48,12.2l-8.3,6.036V6.164z" :fill="autoplay ? '#FFFFFF': '#000'"/>
                      <path d="M49.7,26.2c-0.553,0-1,0.447-1,1c0,6.065-4.935,11-11,11h-24v-8.964L0,39.2l13.7,9.964V40.2h24c7.168,0,13-5.832,13-13   C50.7,26.647,50.253,26.2,49.7,26.2z M11.7,45.236L3.4,39.2l8.3-6.036V45.236z" :fill="autoplay ? '#FFFFFF': '#000'"/>
                    </g>
                </svg>
              </div>
            </div>
            <div class="player-btn player-btn-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </div>

            <div class="percent-vol">
              <input type="range" v-model="volume" min="0" max="1" step="0.1" @change="changeVolume(volume)"/>
            </div>

            <div class="hidden">
              <audio id="player" controls="controls" autobuffer preload="auto">
                <source id="source" src="" type="audio/mpeg">
              </audio>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import musics from './global/musics'

  export default {
    data () {
      return {
        musics: [],
        isPlay: false,
        play: {
          name: 'Music'
        },
        autoplay: false,
        duration: 0,
        currentTime: 0,
        volume: 1
      }
    },
    methods: {
      togglePlay: function () {
        var player = document.getElementById('player')
        var source = document.getElementById('source')
        if (source.src === 'http://localhost:8080/static/music/') {
          alert('No music selected!')
        } else {
          if (this.isPlay) {
            player.pause()
            this.isPlay = false
          } else {
            player.play()
            this.isPlay = true
          }
        }
      },
      plays: function (obj) {
        var player = document.getElementById('player')
        var source = document.getElementById('source')
        this.$data.play = obj
        if (this.isPlay) {
          player.pause()
        }
        var music = obj.name.replace(/ /g, '%20')
        var path = `/static/music/${music.replace(/[#?]/g, '')}`
        source.src = path
        player.load()
        player.play()
        this.isPlay = true
      },
      playNext: function () {
        var index = this.$data.musics.findIndex(x => x.name === this.$data.play.name)
        if (++index < this.$data.musics.length) {
          this.plays(this.$data.musics[index])
        } else {
          this.plays(this.$data.musics[0])
        }
      },
      playPrevious: function () {
        var index = this.$data.musics.findIndex(x => x.name === this.$data.play.name)
        if (--index >= 0) {
          this.plays(this.$data.musics[index])
        } else {
          this.plays(this.$data.musics[this.$data.musics.length - 1])
        }
      },
      auto: function () {
        this.$data.autoplay = !this.$data.autoplay
      },
      changeTime: function (time) {
        var player = document.getElementById('player')
        player.currentTime = time
      },
      changeVolume: function (volume) {
        var player = document.getElementById('player')
        player.volume = volume
      }
    },
    mounted () {
      var player = document.getElementById('player')
      musics.$on('play', musics => {
        this.musics = musics.list
        this.plays(musics.music)
      })
      player.addEventListener('loadeddata', () => {
        this.duration = player.duration
        this.currentTime = player.currentTime
      }, true)
      player.addEventListener('timeupdate', () => {
        this.currentTime = player.currentTime
      }, true)
      player.addEventListener('ended', () => {
        if (!this.$data.autoplay) {
          var index = this.$data.musics.findIndex(x => x.name === this.$data.play.name)
          if (++index < this.$data.musics.length - 1) {
            this.playNext()
          } else {
            this.plays(this.$data.musics[0])
          }
        } else {
          player.pause()
          player.currentTime = 0
          player.play()
          this.isPlay = true
        }
      }, true)
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
    padding: 5px;
    margin-right: 5px;
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

  .hidden {
    display: none;
  }

  @media screen and (max-width: 480px) {
    .hide {
      display: none
    }
  }

  .timer {
    height: 10px;
    width: 100%;
    background: #ccc;
  }

  .ball-time {
    width: 15px;
    height: 15px;
    position: absolute;
    background: #ddd;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 50%;
    right: 0px;
    top: -2.5px;
    border: 50%;
    cursor: pointer;
    transition: .1 linear
  }

  input[type=range]{
    -webkit-appearance: none;
    width: 100%;
  }

  input[type=range]::-webkit-slider-runnable-track {
    cursor: pointer;
    margin-top: -22.5px;
    height: 2px;
    background-color: darkgray;
    border: none;
    border-radius: 3px;
  }

  input[type=range]:hover::-webkit-slider-runnable-track {
    height: 5px;
  }

  input[type=range]::-webkit-slider-thumb {
    cursor: pointer;
    -webkit-appearance: none;
    border: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: lightgrey;
    border: 2px solid rgba(0, 0, 0, .5);
    margin-top: -10px;
    transition: .1 linear
  }

  input[type=range]:hover::-webkit-slider-thumb {
    transform: scale(1.2, 1.2);
    background: #ccc;
    margin-top: -8px;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]:focus::-webkit-slider-runnable-track {
    background: darkgray;
  }

  .space {
    margin-top: 5px !important;
  }

</style>
