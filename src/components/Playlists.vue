<template>
  <div class="container wrap  wrap-tablet wrap-mobile full" id="search">
    <div class="flex basis12">
      <form class="form" v-on:submit="insert(name)">
        <input v-model="name" type="text">
        <button type="submit" class="btn-border btn-border-success">Create</button>
      </form>
    </div>
    <div class="flex basis12">
      <div class="container row">
        <div class="flex"><h3>Image</h3></div>
        <div class="flex"><h3>Name</h3></div>
        <div class="flex"><h3>Options</h3></div>
      </div>
      <div class="container wrap wrap-tablet wrap-mobile">
        <div v-for="x in lists" class="flex basis12 full shad">
          <div class="container wrap wrap-tablet wrap-mobile">
            <div class="flex">
              <img :src="x.img">
            </div>
            <div class="flex">
              <h4>{{x.name}}</h4>
            </div>
            <div class="flex">
              <button @click="remove(x.id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'playlists',
    data () {
      return {
        lists: [],
        name: ''
      }
    },
    methods: {
      get: function () {
        this.$http.get('/youtube/playlist')
          .then(
            response => {
              console.log(response)
              this.$data.lists = response.body
            })
          .catch(
            error => {
              console.log('Error' + JSON.stringify(error))
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