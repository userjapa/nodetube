'use strict'

const Request = require('./../youtube/youtube.js')
const You2mp3 = require('./../youtube/youtube-to-mp3.js')
const Firebase = require('firebase')
const auth = require('./../../../config/auth.json')

let fireapp = Firebase.initializeApp(auth)
let youtube = new Request()

module.exports = () => {
  console.log('Sinchronizing...')
  const db = fireapp.database().ref('/musics')
  var playlists = []
  console.log('Gettig lists...')
  youtube.getLists(lists => {
    console.log('Got lists')
    playlists = lists
    console.log('Getting lists items...')
    for (var x of playlists) {
      youtube.getListItems(x.id, items => {
        for (var y of items) {
          db.orderByChild('id').equalTo(y.id).once('value', snapshot => {
            if (!snapshot.val()) {
              console.log(`Not found ${y.name}`)
              db.push({
                downloaded: true,
                id: y.id,
                img: y.img,
                name: y.name
              })
              console.log('Downloading...')
              var name = y.name.replace(/[#?]/g, '')
              let download = new You2mp3(y.id)
              download.download(name)
                .then(
                  response => {

                  },
                  error => {
                    console.log(`Failed to download`)
                  }
              )
            }
          })
        }
      })
    }
  })
}
