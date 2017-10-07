'use strict'

const fs = require('fs')

module.exports = {
  delete: (name) => {
    var path = __dirname.split('/build/config/file')[0]
    path += '/static/music/' + name
    return new Promise((resolve, reject) => {
      fs.unlink(path, (err) => {
        if (err) reject(err)
        else resolve('Deleted!')
      })
    })
  }
}
