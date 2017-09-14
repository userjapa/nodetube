<template>
  <div id="app">
    <header>
        <span>
            <b class="title">NodeTube</b>
            <router-link class="space" :to="{ path: '/search'}">Search</router-link>
            <router-link class="space" :to="{ path: '/musics'}">Muscis</router-link>
            <router-link class="space" :to="{ path: '/playlists'}">Lists</router-link>
        </span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
    export default {
      name: 'app'
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Gudea');
    body {
        margin: 0;
        font-family: 'Gudea', sans-serif;
    }
    
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    
    main {
        text-align: center;
        margin-top: 40px;
    }
    
    header {
        margin: 0;
        height: 56px;
        padding: 0 16px 0 24px;
        background-color: #35495E;
        color: #ffffff;
        text-align: center;
    }
    
    header span {
        display: block;
        position: relative;
        font-size: 20px;
        line-height: 1;
        letter-spacing: .02em;
        font-weight: 400;
        box-sizing: border-box;
        padding-top: 16px;
    }
    
    .title {
        margin-right: 15%;
    }
    
    .space {
        text-decoration: none;
        color: white;
        margin-right: 2%;
    }
</style>