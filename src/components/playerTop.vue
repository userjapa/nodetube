<template lang="html">
  <div class="relative-player">
      <div class="player container">
        <div class="container size margin justify-content-between align-items-center">

          <div class="flex-basis-100 box">
            <div class="box-music container justify-content-start align-items-center">
              <div class="box-music-img" :syle="{background: 'url(${play.img})'}">

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

            <div class="player-btn player-btn-play">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            </div>

            <div class="percent-vol">
              <div class="vol">

              </div>
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
</template>

<script>
export default {
  data () {
    return {
      musics: [{'downloaded': true, 'id': 'p7u2E6foG8w', 'img': 'https://i.ytimg.com/vi/p7u2E6foG8w/hqdefault.jpg', 'name': 'Amei Ser Criança - família IML part. Chicó.mp3', '.key': '-KrhgdKxIqxcIGjTeXDa'}],
      isPlay: false,
      play: {
        name: 'Music'
      },
      autoplay: false
    }
  },
  methods: {
    togglePlay: function () {
      var player = document.getElementById('player')
      var source = document.getElementById('source')
      if (this.$data.musics.length === 0) {
        alert('No musics selected!')
      } else {
        if (!this.isPlay) {
          if (source.src === 'http://localhost:8080/static/music/') {
            this.plays(this.$data.musics[0])
          } else {
            player.play()
          }
        } else {
          player.pause()
        }
        this.isPlay = !this.isPlay
      }
    },
    plays: function (obj) {
      var player = document.getElementById('player')
      var source = document.getElementById('source')
      this.$data.play = obj
      player.pause()
      var music = obj.name.replace(/ /g, '%20')
      var path = `/static/music/${music}`
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
      var player = document.getElementById('player')
      this.$data.autoplay = !this.$data.autoplay
      console.log(this.$data.autoplay)
      player.addEventListener('ended', () => {
        if (this.$data.autoplay) {
          var index = this.$data.musics.findIndex(x => x.name === this.$data.play.name)
          if (++index < this.$data.musics.length - 1) {
            player.pause()
            this.plays(this.$data.musics[index])
          } else {
            this.plays(this.$data.musics[0])
          }
        } else {
          player.pause()
          this.isPlay = false
        }
      }, true)
    },
    setMusics: function (arr) {
      this.$data.musics = arr
      this.plays(arr[0])
    }
  },
  created () {
    this.$on('setter', (arr) => {
      this.$data.musics = arr
    })
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
.hidden {
  display: none;
}
@media screen and (max-width: 480px) {
  .hide {
    display: none
  }
}
</style>
