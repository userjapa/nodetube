'use strict'

const Request = require('./../youtube/youtube.js')
const You2mp3 = require('./../youtube/youtube-to-mp3.js')
const Firebase = require('firebase')
const auth = require('./../auth.json')

let fireapp = Firebase.initializeApp(auth)
let youtube = new Request()

var sync = false

const db = fireapp.database().ref('/musics/japa')

const getData = () => {
  return new Promise((resolve, reject) => {
    db.on('value', snapshot => {
      resolve(snapshot.val())
    })
  })
}

const check = (musics, id) => {
  return new Promise((resolve, reject) => {
    for (var x in musics) {
      if (musics[x].id === id) {
        resolve(false)
      }
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
        resolve(err)
      })
  })
}

const getLists = () => {
  return new Promise((resolve, reject) => {
    youtube.getLists(lists => {
      resolve(lists)
    })
  })
}

const synchronize = async musics => {
  sync = true
  var lists = await getLists()
  console.log(`Got lists`)
  for (var x of lists) {
    var items = await getListItems(x.id)
    console.log(`Got items`)
    for (var y of items) {
      var exist = await check(musics, y.id)
      if (exist) {
        console.log(`Downloading`)
        db.push({
          id: y.id,
          name: y.name,
          img: y.img
        })
        await download(y.id, y.name)
      }
    }
  }
  sync = false
}

module.exports = async () => {
  if (!sync) {
    var musics = await getData()
    console.log(`Got data`)
    await synchronize(musics)
  }
  console.log(`Sinchronize finished...`)
}
