<template>
  <div class="container wrap  wrap-tablet wrap-mobile full" id="search">
     <div class="flex basis12">
         <form class="form" v-on:submit="search(txt)">
             <input type="text" v-model="txt" placeholder="Song?">
             <button type="submit" class="btn-border btn-border-success">Search</button>
         </form>
      </div>
      <div class="flex basis12">
          <div class="container wrap wrap-tablet wrap-mobile">
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

  let db = new Firebase('/musics')

  export default {
    name: 'search',
    data () {
      return {
        txt: '',
        videos: [],
        x: 0
      }
    },
    methods: {
      search: function (txt) {
        this.$http.post('/youtube/music', {
          search: txt
        })
        .then(
          response => {
            this.$data.videos = response.body
          }, error => {
            console.log('Error' + JSON.stringify(error))
          })
      },
      download: function (el) {
        el.name = el.name.replace(/[#?]/g, '')
        db.check(el.id).then(response => {
          if (!response) {
            el.name = el.name
            db.add(el)
          }
          db.get(el).then(res => {
            res.forEach((childSnapshot) => {
              var tmp = childSnapshot.val()
              if (!tmp.downloaded) {
                tmp.downloaded = true
                db.db.child(childSnapshot.key).update(tmp)
                var aux = {
                  id: el.id,
                  name: el.name
                }
                console.log(aux.name)
                this.$http.get('/youtube/music', {
                  params: aux
                })
                .then(
                  response => {
                    console.log('Finished')
                  }, err => {
                    console.log(err)
                  })
              } else {
                alert('Já baixado!')
              }
            })
          })
        })
      }
    }
  }
</script>

<style>
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