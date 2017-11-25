'use strict'

const Youtube = require('./youtube/youtube.js')
const You2mp3 = require('./youtube/youtube-to-mp3.js')
const file = require('./file/file.js')
const sinchronize = require('./synchronize/sinchronize-file.js')
const fs = require('fs')

let tube = new Youtube()

module.exports = app => {
  app.route('/api/youtube/auth')
    .get((req, res) => {
      res.send(tube.getScope())
    })

  app.route('/api/youtube/token')
    .get((req, res) => {
      tube.getToken(req.query.code, response => {
        res.send(response)
      })
    })

  app.route('/api/youtube/music')
    .get((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.search(req.query.search, 6, response => {
        res.json(response)
      })
    })
    .post((req, res) => {
      let download = new You2mp3(req.body.id)
      var name = req.body.name
      download.download(name)
        .then(
          response => {
            res.send(response)
          },
          error => {
            console.log(error)
            res.send('Could not download the file.')
          })
    })
    .delete((req, res) => {
      file.delete(req.query.name)
      res.end()
    })

  app.route('/api/youtube/playlist')
    .get((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.getLists(response => {
        sinchronize()
        res.json(response)
      })
    })
    .post((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.insertList(req.query.name, response => {
        res.send(response)
      })
    })
    .delete((req, res) => {
      tube.deleteList(req.query.id, response => {
        res.send(response)
      })
    })

  app.route('/api/youtube/playlist/:id')
    .get((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.getListItems(req.params.id, response => {
        res.json(response)
      })
    })

  app.route('/api/youtube/playlistItems')
    .post((req, res) => {
      tube.insertItem(req.body.idList, req.body.idVideo, response => {
        res.send(response)
      })
    })
    .delete((req, res) => {
      tube.deleteItem(req.query.id, response => {
        res.send(response)
      })
    })

  app.route('/api/music/stream')
    .post((req, res) => {
      res.setHeader('Content-Type', 'audio/mp3')
      res.download(`./static/music/${req.body.name}`)
    })
}
