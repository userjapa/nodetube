'use strict'

const Youtube = require('./youtube/youtube.js'),
  You2mp3 = require('./youtube/youtube-to-mp3.js'),
  file = require('./file/file.js')

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
      tube.getToken(req.query.code, (response) => {
        res.send(response)
      })
    })

  app.route('/youtube/music')
    .get((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.search(req.query.search, 6, (response) => {
        var result = response.items.map(obj => {
          var mapped = {
            id: obj.id.videoId,
            name: `${obj.snippet.title}.mp3`,
            img: obj.snippet.thumbnails.high.url,
            downloaded: false
          }
          return mapped
        })
        res.json(result)
      })
    })
    .post((req, res) => {
      let download = new You2mp3(req.body.id)
      var name = req.body.name
      download.download(name)
      res.end()
    })
    .delete((req, res) => {
      file.delete(req.query.name)
      res.end()
    })
  app.route('/youtube/playlist')
    .get((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.getLists((response) => {
        var result = response.items.map(obj => {
          var mapped = {
            id: obj.id,
            img: obj.snippet.thumbnails.high.url,
            name: obj.snippet.title
          }
          return mapped
        })
        res.json(result)
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
}