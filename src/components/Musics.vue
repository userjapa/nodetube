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
          <div v-for="(x, index) in musics" :key="x.id" class="container row  wrap-tablet wrap-mobile shad">
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
          </div>
        </div>
    </div>
  </div>
</template>

<script>
    import Firebase from './../modules/firebase'
    let db = new Firebase('/musics')
    
    export default {
      name: 'musics',
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
</style>