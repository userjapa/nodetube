const google = require('googleapis')

const OAuth2 = google.auth.OAuth2
const youtube = google.youtube('v3')

let host = 'http://'

if (process.env.NODE_ENV !== 'development') {
  if (!process.env.PORT) {
    host += 'localhost:5000'
  } else {
    host = 'https://nodetube-project.herokuapp.com'
  }
} else {
  host += 'localhost:8080'
}

const myAuth = new OAuth2(
  '15814234286-jbc94dpj5kv24aah86l5pnqn3h97rp62.apps.googleusercontent.com',
  'OhbUd162NH9Jvg4MbEpBuvL4',
  host
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
          console.log(`Token Error: \n${err}`)
          reject(err)
        } else {
          myAuth.setCredentials(response)
          resolve(response)
        }
      })
    })
  },
  search: (params) => {
    return new Promise((resolve, reject) => {
      var options = {}
      Object.assign(options, part, params)
      youtube.search.list(options, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  },
  playlists: {
    search: (params) => {
      return new Promise((resolve, reject) => {
        var options = {}
        Object.assign(options, part, params)
        youtube.playlists.list(options, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      })
    },
    insert: (params) => {
      return new Promise((resolve, reject) => {
        var options = {}
        Object.assign(options, part, params)
        youtube.playlists.insert(options, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      })
    },
    delete: (params) => {
      return new Promise((resolve, reject) => {
        var options = Object.assign({
          auth: myAuth
        }, params)
        youtube.playlists.delete(options, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      })
    }
  },
  playlistItems: {
    getVideos: (params) => {
      return new Promise((resolve, reject) => {
        var options = {}
        Object.assign(options, part, params)
        youtube.playlistItems.list(options, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      })
    },
    insert: (params) => {
      return new Promise((resolve, reject) => {
        var options = {}
        Object.assign(options, part, params)
        youtube.playlistItems.insert(options, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      })
    },
    delete: (params) => {
      return new Promise((resolve, reject) => {
        var options = {}
        Object.assign(options, {
          auth: myAuth
        }, params)
        youtube.playlistItems.delete(options, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      })
    }
  }
}
