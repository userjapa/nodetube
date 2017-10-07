'use strict'

const Request = require('./../youtube/youtube.js')
const You2mp3 = require('./../youtube/youtube-to-mp3.js')
const Firebase = require('firebase')
const auth = require('./../../../config/auth.json')

let fireapp = Firebase.initializeApp(auth)
let youtube = new Request()

const db = fireapp.database().ref('/musics')

const getData = callback => {
  db.on('value', snapshot => {
    return callback(snapshot.val())
  })
}

const check = (musics, id) => {
  return new Promise((resolve, reject) => {
    for (var x in musics) {
      if (musics[x].id === id) { reject(false) }
    }
    resolve(true)
  })
}

const getListItems = id => {
  return new Promise((resolve, reject) => {
    youtube.getListItems(id, items => {
      resolve(items)
    })
  })
}

const download = (id, name) => {
  return new Promise((resolve, reject) => {
    const Download = new You2mp3(id)
    Download.download(name.replace(/[#?]/g, ''))
    .then(
      res => {
        resolve(res)
      },
      err => {
        reject(err)
      })
  })
}

module.exports = () => {
  getData(musics => {
    console.log(`Got data`)
    youtube.getLists(async lists => {
      console.log(`Got lists`)
      for (var x of lists) {
        var items = await getListItems(x.id)
        console.log(`Got items`)
        for (var y of items) {
          if (await check(musics, y.id)) {
            console.log(`Downloading`)
            db.push({
              id: y.id,
              name: y.name,
              img: y.img
            })
            var downloaded = await download(y.id, y.name)
            console.log(downloaded)
          }
        }
      }
    })
  })
}
