import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Fire from 'vuefire'
import Login from '@/components/Login'
import Search from '@/components/Search'
import Musics from '@/components/Musics'
import Playlists from '@/components/Playlists'
import List from '@/components/List'

Vue.use(Router)
Vue.use(Resource)
Vue.use(Fire)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }, {
      path: '/musics',
      name: 'Musics',
      component: Musics
    }, {
      path: '/playlists',
      name: 'Playlists',
      component: Playlists
    }, {
      path: '/playlists/:id',
      name: 'List',
      component: List
    }
  ]
})
