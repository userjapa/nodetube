'use strict'

const request = require('./request/google-apis.js')

module.exports = function () {
  this.getScope = () => {
    return request.getAuth()
  }

  this.getToken = (code, callback) => {
    request.getToken(code)
      .then(
        res => {
          return callback(res)
        })
      .catch(
        err => {
          console.log(`Tokien Error: \n${JSON.stringify(err)}`)
          return callback(err)
        })
  }

  this.search = (txt, n, callback) => {
    var body = {
      q: txt,
      maxResults: n
    }
    request.search(body)
      .then(
        res => {
          var result = res.items.map(obj => {
            var mapped = {
              id: obj.id.videoId,
              name: `${obj.snippet.title}.mp3`,
              img: obj.snippet.thumbnails.high.url
            }
            return mapped
          })
          return callback(result)
        })
      .catch(
        err => {
          console.log(`Search Error: \n${JSON.stringify(err)}`)
          return callback([])
        })
  }
  this.getLists = (callback) => {
    var body = {
      channelId: `UC3RbuqXHUjECRKgRvOtdJBA`
    }
    request.playlists.search(body)
      .then(
        res => {
          var result = res.items.map(obj => {
            var mapped = {
              id: obj.id,
              img: obj.snippet.thumbnails.high.url,
              name: obj.snippet.title
            }
            return mapped
          })
          return callback(result)
        })
      .catch(
        err => {
          console.log(`Playlist Search Error: \n${JSON.stringify(err)}`)
          return callback([])
        })
  }

  this.insertList = (name, callback) => {
    var body = {
      resource: {
        snippet: {
          title: name
        }
      }
    }
    request.playlists.insert(body)
      .then(
        res => {
          return callback(res)
        })
      .catch(
        err => {
          console.log(`Playlist Insert Error: \n${JSON.stringify(err)}`)
          return callback(err)
        })
  }

  this.deleteList = (id, callback) => {
    var body = {
      id: id
    }
    request.playlists.delete(body)
      .then(
        res => {
          return callback(res)
        })
      .catch(
        err => {
          console.log(`Playlist Delete Error: \n${JSON.stringify(err)}`)
          return callback(err)
        })
  }

  this.getListItems = (id, callback) => {
    var body = {
      playlistId: id,
      maxResults: 50
    }
    request.playlistItems.getVideos(body)
      .then(
        res => {
          var result = res.items.map(obj => {
            var mapped = {
              listVideoId: obj.id,
              id: obj.snippet.resourceId.videoId,
              img: obj.snippet.thumbnails.high.url,
              name: obj.snippet.title + '.mp3'
            }
            return mapped
          })
          return callback(result)
        })
      .catch(
        err => {
          console.log(`PlaylistItems List Error: \n${JSON.stringify(err)}`)
          return callback([])
        })
  }

  this.insertItem = (playlistId, videoId, callback) => {
    var body = {
      resource: {
        snippet: {
          playlistId: playlistId,
          resourceId: {
            videoId: videoId,
            kind: 'youtube#video'
          }
        }
      }
    }
    request.playlistItems.insert(body)
      .then(
        res => {
          return callback(body)
        })
      .catch(
        err => {
          console.log(`PlaylistItems Insert Error: \n${JSON.stringify(err)}`)
          return callback([])
        })
  }

  this.deleteItem = (id, callback) => {
    var body = {
      id: id
    }
    request.playlistItems.delete(body)
      .then(
        res => {
          return callback(res)
        })
      .catch(
        err => {
          console.log(`PlaylistItems Delete Error: \n${JSON.stringify(err)}`)
          return callback(err)
        })
  }

  return this
}
