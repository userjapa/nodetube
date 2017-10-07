'use strict'

const Youtube = require('./youtube/youtube.js'),
  You2mp3 = require('./youtube/youtube-to-mp3.js'),
  file = require('./file/file.js'),
  sinchronize = require('./synchronize/sinchronize-file.js'),
  fs = require('fs')

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

  app.route('/music/stream')
    .post((req, res) => {
      console.log('Get stream')
      var stat = fs.statSync(`./static/music/${req.body.name}`)

      // res.writeHead(200, {
      //     'Content-Type': 'audio/ogg',
      //     'Content-Length': stat.size,
      //     'Content-Disposition': `attachment; filename=${req.body.name}`
      // });

      res.setHeader('Content-Length', stat.size)
      res.setHeader('Content-Type', 'audio/mp3')
      res.setHeader('Content-Disposition', 'attachment; filename=your_file_name')
      // res.download(`./static/music/${req.body.name}`, req.body.name)
      var fileStream = fs.createReadStream(`./static/music/${req.body.name}`)
      res.pipe(fileStream)
    })
}
