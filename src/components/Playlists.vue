<template>
  <div>
    <div>
      <input v-model="name" type="text">
      <button @click="insert(name)">Create</button>
    </div>
    <div v-for="x in lists">
      <img :src="x.img">
      <h3>{{x.name}}</h3>
      <button @click="remove(x.id)">Delete</button>
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
            res => {
              this.$data.lists = res.data
              console.log(res)
            }, err => {
              console.log(err)
            })
      },
      insert: function (name) {
        this.$http.post(`/youtube/playlist?name=${name}`)
          .then(
            res => {
              console.log(res)
            }, err => {
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
            }, err => {
              console.log(err)
            })
          .finally(() => {
            this.get()
          })
      }
    },
    beforeMount () {
      setTimeout(() => {
        this.get()
      }, 1000)
    }
  }
</script>

<style>

</style>