'use strict'

const you2mp3 = require('youtube-mp3-downloader')

module.exports = function (id) {
    this.id = id

    let path = __dirname.split('/build/config/youtube')[0]
        path += '/static/music'
        
    let YD = new you2mp3({
        'ffmpegPath': '/usr/bin/ffmpeg',
        'outputPath': path,
        'youtubeVideoQuality': 'highest',
        'queueParallelism': 2,
        'progressTimeout': 2000
    })

    this.download = (name) => {
        YD.download(this.id, name)

        YD.on('finished', (err, data) => {
            console.log(data.videoTitle)
        })

        YD.on('error', (err) => {
            console.log(err)
        })

        YD.on('progress', (progress) => {
            console.log(progress.progress.percentage)
        })
    }

    return this
}