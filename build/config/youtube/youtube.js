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
          return callback(res)
        })
      .catch(
        err => {
          return callback(err)
        })
  }
  this.getLists = (callback) => {
    var body = {
      channelId: `UC3RbuqXHUjECRKgRvOtdJBA`
    }
    request.playlists.search(body)
      .then(
        res => {
          return callback(res)
        })
      .catch(
        err => {
          return callback(err)
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
          return callback(err)
        })
  }

  return this
}