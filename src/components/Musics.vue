<template>
  <div>
    <h1>Musics</h1>
    <div class="container wrap  wrap-tablet wrap-mobile center-center">
        <div class="flex basis12">
            <audio id="player" controls="controls" autobuffer preload="auto">
                <source id="source" src="/static/music/" type="audio/mpeg">
            </audio>
            <button @click="auto()">AutoPlay</button>
            <button @click="playNext()">Next</button>
            <button @click="playPrevious()">Previous</button>
        </div>
        <div class="flex basis12">
          <div class="container row">
            <div class="flex">Name</div>
            <div class="flex">Image</div>
            <div class="flex">Options</div>
          </div>
          <!-- <div v-for="(x, index) in musics" :key="x.id" class="container row  wrap-tablet wrap-mobile shad">
            <div class="flex">
                {{x.name.split('.mp3')[0]}} {{index}}
            </div>
            <div class="flex">
                <img :src="x.img" style="width: 100%; max-width: 300px; min-width: 100px;">
            </div>
            <div class="flex">
                <div class="container wrap wrap-tablet wrap-mobile center-center space-around" style="height: 100%">
                    <div class="flex basis1">
                        <button id="show-modal" @click="plays(x)" class="btn-border btn-border-success btn-full">
                            <img src="./../assets/icons/play.png">
                        </button>
                    </div>
                    <div class="flex basis1">
                        <button @click="remove(x)" class="btn-border btn-border-danger btn-full">
                            <img src="./../assets/icons/delete.png">
                        </button>
                    </div>
                </div>
                <div class="container wrap wrap-tablet wrap-mobile center-center space-around" style="height: 100%">
                  <div class="flex basis1">
                    <select class="btn-border btn-border-primary btn-full" v-on:input="addTo($event.target.value, x.id)">
                      <option selected disabled value="">Add to Playlist</option>
                      <option v-for="y in lists" :key="y.id" :value="y.id" :disabled="check(x.playlists, y.id)">{{y.name}}</option>
                    </select>
                  </div>
                </div>
            </div>
          </div> -->

          <div class="container wrap justify-content-start align-items-baseline size">

              <div class="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12 box-youtube" v-for="(x, index) in musics" :key="x.id">
                <div class="box-youtube-content">
                  <div class="hover-play">
                    <div class="player-btn player-btn-play" v-cloak @click="plays(x)" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                    </div>
                  </div>
                  <div class="box-youtube-content-image">
                    <img :src="x.img" style="width: 100%; max-width: 300px; min-width: 100px;">
                  </div>
                  <div class="box-youtube-content-name">
                    {{x.name.split('.mp3')[0]}} {{index}}
                    <span class="pointer" v-cloak @click="remove(x)" >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </span>
                  </div>
                </div>
              </div>

          </div>
        </div>
    </div>
    <div id="playerTop">
      <playerTop></playerTop>
    </div>
  </div>
</template>

<script>
    import Firebase from './../modules/firebase'
    import playerTop from './playerTop'
    let db = new Firebase('/musics')

    export default {
      name: 'musics',
      components: {
        playerTop
      },
      data () {
        return {
          el: '',
          play: {},
          musics: [],
          autoplay: false,
          lists: []
        }
      },
      methods: {
        remove: function (obj) {
          // var name = obj.name.replace(/ /g, '%20')
          this.$http.delete('/youtube/music', {params: {name: obj.name}})
            .then(
              response => {
                console.log(response)
              })
            .catch(
              err => {
                console.log(err)
              })
          this.$firebaseRefs.musics.child(obj['.key']).remove()
        },
        filter: (el) => {
          return el.replace(/ /g, '%20')
        },
        plays: function (obj) {
          this.$data.play = obj
          var player = document.getElementById('player')
          var source = document.getElementById('source')
          player.pause()
          var music = this.filter(obj.name)
          var path = `/static/music/${music}`
          source.src = path
          player.load()
          player.play()
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
            }
          }, true)
        },
        addTo: function (listId, videoId) {
          this.$http.post('/youtube/playlistItems', {
            idList: listId,
            idVideo: videoId
          })
            .then(
              res => {
                console.log(res)
              })
            .catch(
              err => {
                console.log(err)
              })
        },
        check: function (arr, id) {
          if (arr) {
            if (arr.includes(id)) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        }
      },
      firebase () {
        return {
          musics: db.db
        }
      },
      created () {
        this.$http.get('/youtube/playlist')
          .then(
            res => {
              this.$data.lists = res.body
            })
          .catch(
            err => {
              console.log(err)
            })
      }
    }
</script>

<style>
    h1 {
        font-weight: normal;
    }

    .container .flex {
       overflow: hidden;
       word-break: break-all;
       padding: 0 5px;
    }

    .container .flex * {
        margin: auto;
        text-align: center;
    }
    .box-youtube {
      padding: 10px!important;
      box-sizing: border-box;
    }
    .size {
      width: 1200px;
      max-width: 95%;
    }
    .box-youtube-content {
      /*background: #ccc;*/
      height: 300px;
      overflow: hidden;
      position: relative;
    }
    .box-youtube-content-image img {
      border-radius: 5px;
      overflow: hidden;
    }
    .hover-play svg {
      opacity: .9
    }
    .hover-play {
      position: absolute;
      width: 100%;
      height: 210px;
      display: flex;
      justify-content: center;
      align-items: center;
      display: none;
      cursor: pointer
    }
    .box-youtube-content .hover-play {
      transition: .1s all
    }
    .box-youtube-content:hover .hover-play {
      display: flex;
      background: rgba(0, 0, 0, 0.5);
    }
    .box-youtube-content-name {
      text-align: left!important
    }
    .pointer {
      cursor: pointer;
    }
</style>
