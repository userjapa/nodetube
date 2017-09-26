<template>
  <div class="container wrap  wrap-tablet wrap-mobile full" id="search">
    <div class="flex basis12">
      <div class="container wrap wrap-tablet wrap-mobile">
        <div v-for="x in musics" class="flex basis5 full shad">
          <div class="container wrap wrap-tablet wrap-mobile">
            <div class="flex full">
              <img :src="x.img">
            </div>
            <div class="flex full">
              <h4>{{x.name}}</h4>
            </div>
            <div class="flex full">
              <button @click="play(x)">Play</button>
              <button @click="remover(x.listVideoId)">Delete</button>
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
    name: 'list',
    data () {
      return {
        musics: []
      }
    },
    methods: {
      play: function (obj) {
        musics.$emit('play', {music: obj, list: this.musics})
      },
      get: function () {
        this.$http.get(`/youtube/playlist/${this.$route.params.id}`)
        .then(
          res => {
            this.$data.musics = res.body
            console.log(res)
          })
        .catch(
          err => {
            console.log(err)
          })
      },
      remover: function (id) {
        console.log(id)
        this.$http.delete(`/youtube/playlistItems?id=${id}`)
          .then(
            res => {
              console.log(res)
            })
          .catch(
            err => {
              console.log(err)
            })
          .finally(() => {
            this.get()
          })
      }
    },
    created () {
      this.get()
    }
  }
</script>

<style>

</style>