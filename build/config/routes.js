'use strict'

const Youtube = require('./youtube/youtube.js'),
  You2mp3 = require('./youtube/youtube-to-mp3.js'),
  file = require('./file/file.js'),
  sinchronize = require('./synchronize/sinchronize-file.js'),
  stream = require('./stream/stream-audio.js')

let tube = new Youtube()

module.exports = app => {
  app.route('/')
    .get((req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      res.write('NodeTube - API')
      res.send()
    })

  app.route('/youtube/auth')
    .get((req, res) => {
      res.send(tube.getScope())
    })

  app.route('/youtube/token')
    .get((req, res) => {
      tube.getToken(req.query.code, response => {
        res.send(response)
      })
    })

  app.route('/youtube/music')
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

  app.route('/youtube/playlist')
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

  app.route('/youtube/playlist/:id')
    .get((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.getListItems(req.params.id, response => {
        res.json(response)
      })
    })

  app.route('/youtube/playlistItems')
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

  app.route('/music/stream/:name')
    .get((req, res) => {
      stream(req.params.name, res)
    })
}
