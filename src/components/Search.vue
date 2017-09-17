<template>
<div>

    <div class="" id="search" >
     <div class="flex basis12">
         <form class="form" v-on:submit="search(txt)">
             <input type="text" v-model="txt" placeholder="Song?">
             <button type="submit" class="btn-border btn-border-success">Search</button>
         </form>
      </div>
        
      <div class="flex basis12">
        <div class="container wrap" v-show="isLoading" v-cloak>
        <div  v-for="x in 3" class="flex-basis-300 flex-grow-1 card">
      <placeholderContent type="card" :title="false" :imageSize="300" :description="true" :number="1" :photo="true" :head="false" :button="false"></placeholderContent>      
  </div>
  </div>
          <div class="container wrap wrap-tablet wrap-mobile" v-show="!isLoading" v-cloak>
              <div v-for="x in videos" class="flex basis5 full shad">
                  <div class="container wrap wrap-tablet wrap-mobile">
                      <div class="flax full">
                          <h4>{{x.name.split('.mp3')[0]}}</h4>
                      </div>
                      <div class="flax full">
                          <iframe class="content" :src="'https://www.youtube.com/embed/' + x.id + '?color=white&controls=1&showinfo=0&iv_load_policy=3&modestbranding=1&playsinline=1'" frameborder="0" allowfullscreen></iframe>   
                      </div>
                      <div class="flax full">
                          <button v-on:click="download(x)" class="btn-border btn-border-success">Download</button>
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
  import placeholderContent from './placeholderContent.vue'
  let db = new Firebase('/musics')

  export default {
    name: 'search',
    data () {
      return {
        txt: '',
        videos: [],
        x: 0,
        isLoading: false
      }
    },
    components: {
      placeholderContent
    },
    methods: {
      search: function (txt) {
        this.isLoading = true
        this.$http.get('/youtube/music', {
          params: {
            search: txt
          }
        })
        .then(
          response => {
            this.isLoading = false
            console.log(response)
            this.$data.videos = response.body
            this.$data.txt = ''
          })
        .catch(
          error => {
            this.isLoading = false
            console.log('Error' + JSON.stringify(error))
          })
      },
      download: function (el) {
        if (!db.check(el)) {
          alert('Already Downloaded!')
        } else {
          el.name = el.name.replace(/[#?]/g, '')
          db.add(el)
          db.get(el).then(res => {
            res.forEach((childSnapshot) => {
              var tmp = childSnapshot.val()
              tmp.downloaded = true
              db.db.child(childSnapshot.key).update(tmp)
              this.$http.post('/youtube/music',
                {
                  id: el.id,
                  name: el.name
                })
              .then(
                response => {
                  console.log(response)
                })
              .catch(
                err => {
                  console.log(err)
                })
              .finally(
                () => {
                  console.log('Finished')
                })
            })
          })
        }
      }
    }
  }
</script>

<style>
  .card {
    padding: 20px
  }
  .size {
    width: 1200px;
    max-width: 90%;
    margin: 0 auto
  }
  h1 {
    font-weight: normal;
  }
  
  .full h4 {
    padding: 15px;
  }
  
  .full button {
    margin: 5px !important;
    width: 50%;
  }
  
  .content {
    width: 80%;
    min-height: 400px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  @media only screen and (max-width: 500px) {
    .content {
      min-height: 200px;
    }
  }
</style>