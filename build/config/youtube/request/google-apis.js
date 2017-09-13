const google = require('googleapis')

const OAuth2 = google.auth.OAuth2,
  youtube = google.youtube('v3')

const myAuth = new OAuth2(
    '15814234286-jbc94dpj5kv24aah86l5pnqn3h97rp62.apps.googleusercontent.com',
    'OhbUd162NH9Jvg4MbEpBuvL4',
    'http://localhost:8080'
  )

const scope = myAuth.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/youtube'
    ]
  })

var part = {
  auth: myAuth,
  part: 'snippet'
}

module.exports = {
  getAuth: () => {
    return scope
  },
  getToken: (code) => {
    return new Promise((resolve, reject) => {
      myAuth.getToken(code, (err, response) => {
        if (err) {
          console.log(`Token Error: ${err}`)
          reject(err)
        } else {
          myAuth.setCredentials(response)
          console.log(`Token Response: ${response}`)
          resolve(response)
        }
      })
    })
  },
  search: (params) => {
    return new Promise((resolve, reject) => {
      var options = Object.assign(part, params)
      youtube.search.list(options, (err, response) => {
        if (err) {
          console.log(`Search Error: ${err}`)
          reject(err)
        } else {
          console.log(`Search Response: ${response}`)
          resolve(response)
        }
      })
    })
  },
  playlists: {
    search: (params) => {
      return new Promise((resolve, reject) => {
        var options = Object.assign(part, params)
        youtube.playlists.list(options, (err, response) => {
          if (err) {
            console.log(`Playlist Search Error: ${err}`)
            reject(err)
          } else {
            console.log(`Playlist Search Response: ${response}`)
            resolve(response)
          }
        })        
      })
    },
    insert: (params) => {
      return new Promise((resolve, reject) => {
        var options = Object.assign(part, params)
        youtube.playlists.insert(options, (err, response) => {
          if (err) {
            console.log(`Playlist Insert Error: ${err}`)
            reject(err)
          } else {
            console.log(`Playlist Insert Response: ${response}`)
            resolve(response)
          }
        })
      })
    },
    delete: (params) => {
      return new Promise((resolve, reject) => {
        var options = Object.assign({auth: myAuth}, params)
        youtube.playlists.delete(options, (err, response) => {
          if (err) {
            console.log(`PLaylist Delete Error: ${err}`)
            reject(err)
          } else {
            console.log(`Playlist Delete Response: ${response}`)
            resolve(response)
          }
        })
      })
    }
  }
}