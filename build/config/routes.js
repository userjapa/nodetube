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
      tube.getToken(req.query.code)
        .then(
          response => {
            res.send(response)
          }, 
          err => {
            console.log(`Get Token: ${err}`)
            res.send(err)
          })
    })

  app.route('/youtube/music')
    .post((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.search(req.body.search, 6)
        .then(
          response => {
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
          },
          err => {
            console.log(`Get Music: ${err}`)
            res.send(err)
          })
    })
    .get((req, res) => {
      let download = new You2mp3(req.query.id)
      var name = req.query.name
      download.download(name)
      res.send()
    })
    .delete((req, res) => {
      file.delete(req.query.name)
        .then(
          resolve => {
            console.log(`Deleted ${req.query.name}`)
            res.send()
          },
        error => {
            console.log(`Delete Music: ${error}`)
            res.send()
          })
    })
  app.route('/youtube/playlist')
    .get((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.getLists()
        .then(
          response => {
            var result = response.items.map(obj => {
              var mapped = {
                id: obj.id,
                img: obj.snippet.thumbnails.high.url,
                name: obj.snippet.title
              }
              return mapped
            })
            res.json(result)
          },
          err => {
            console.log(`Get List: ${err}`)
            res.send(err)
          })
    })
    .post((req, res) => {
      res.setHeader('Content-Type', 'application/json')
      tube.insertList(req.query.name)
        .then(
          response => {
            res.json(response)
          },
          err => {
            console.log(`Post List: ${err}`)
            res.send(err)
          })
    })

    .delete((req, res) => {
      tube.deleteList(req.query.id)
        .then(
          response => {
            res.send(response)
          },
          err => {
            console.log(`Delete List: ${err}`)
            res.send(err)
          })
    })
}