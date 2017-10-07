<template>
  <div>
    <h1>Playlists</h1>
    <div class="container wrap  wrap-tablet wrap-mobile full">
      <div class="flex basis12">
        <form class="form" v-on:submit="insert(name)">
          <input v-model="name" type="text">
          <button type="submit" class="btn-border btn-border-success">Create</button>
        </form>
      </div>
    </div>
      <div class="container wrap  wrap-tablet wrap-mobile">
          <div class="flex basis12">
            <div class="container wrap size" v-show="isLoading" v-cloak>
              <div v-for="x in 4" class="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12 card">
                <placeholderContent type="card" :title="false" :imageSize="200" :description="true" :number="1" :photo="true" :head="false" :button="false"></placeholderContent>
              </div>
            </div>
            <div class="container wrap justify-content-start align-items-baseline size" v-show="!isLoading" v-cloak>

                <div class="col-12 col-xl-3 col-lg-3 col-md-6 col-sm-12 box-youtube" v-for="x in lists" :key="x.id" @click="goTo(x.id, x.name)">
                  <div class="box-youtube-content">
                    <div class="hover-play">
                      <div class="player-btn player-btn-play">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
                      </div>
                    </div>
                    <div class="box-youtube-content-image">
                      <img :src="x.img" style="width: 100%; max-width: 300px; min-width: 100px;">
                    </div>
                    <div class="box-youtube-content-name">
                      {{x.name.split('.mp3')[0]}}
                      <span class="pointer" v-cloak @click="remove(x.id)" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import placeholderContent from '../../node_modules/monk-placeholder-content/src/components/placeholder-content.vue'

  export default {
    name: 'playlists',
    components: {
      placeholderContent
    },
    data () {
      return {
        name: '',
        lists: [],
        isLoading: true
      }
    },
    methods: {
      get: function () {
        this.isLoading = true
        this.$http.get('/youtube/playlist')
          .then(
            response => {
              console.log(response)
              this.$data.lists = response.body
              this.isLoading = false
            })
          .catch(
            error => {
              console.log('Error' + JSON.stringify(error))
              this.isLoading = false
            })
      },
      insert: function (name) {
        this.$http.post(`/youtube/playlist?name=${name}`)
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
            this.$data.name = ''
          })
      },
      remove: function (id) {
        this.$http.delete(`/youtube/playlist?id=${id}`)
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
      },
      goTo: function (id, name) {
        this.$router.push({ path: `/playlists/${id}/${name}` })
      }
    },
    mounted () {
      this.get()
    }
  }
</script>

<style>
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
