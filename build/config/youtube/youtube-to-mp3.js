'use strict'

const You2mp3 = require('youtube-mp3-downloader')

module.exports = function (id) {
  this.id = id

  let path = __dirname.split('/build/config/youtube')[0]
  path += '/static/music'

  let YD = new You2mp3({
    'ffmpegPath': '/usr/bin/ffmpeg',
    'outputPath': path,
    'youtubeVideoQuality': 'highest',
    'queueParallelism': 2,
    'progressTimeout': 2000
  })

  this.download = (name) => {
    return new Promise((resolve, reject) => {
      YD.download(this.id, name)

      YD.on('finished', (err, data) => {
        if (err) reject(err)
        console.log(`Downloaded ${data.videoTitle}`)
        resolve(`${data.videoTitle} downloaded!`)
      })

      YD.on('error', (err) => {
        reject(err)
      })

      YD.on('progress', (progress) => {
        console.log(progress.progress.percentage)
      })
    })
  }

  return this
}
