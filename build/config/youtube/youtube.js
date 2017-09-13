'use strict'

const request = require('./request/google-apis.js')

module.exports = function () {
  this.getScope = () => {
    return request.getAuth()
  }

  this.getToken = (code) => {
    return new Promise((resolve, reject) => {
      request.getToken(code)
        .then(
          res => {
            resolve(res)
          }, 
          err => {
            reject(err)
          })
    })
  }

  this.search = (txt, n) => {
    return new Promise((resolve, reject) => {
      var body = {
        q: txt,
        maxResults: n
      }
      request.search(body)
        .then(
          res => {
            resolve(res)
          }, 
          err => {
            reject(err)
          })
    })
  }
  this.getLists = () => {
    return new Promise((resolve, reject) => {
      var body = {
        channelId: `UC3RbuqXHUjECRKgRvOtdJBA`
      }
      request.playlists.search(body)
        .then(
          res => {
            resolve(res)
          }, 
          err => {
            reject(err)
          })
    })
  }

  this.insertList = (name) => {
    return new Promise((resolve, reject) => {
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
            resolve(res)
          },
          err => {
            reject(err)
          })
    })
  }

  this.deleteList = (id) => {
    return new Promise((resolve, reject) => {
      var body = {
        id: id
      }
      request.playlists.delete(body)
        .then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          })
    })
  }

  return this
}