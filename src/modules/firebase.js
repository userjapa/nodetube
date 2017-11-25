import Firebase from 'firebase'
import auth from './../../config/auth.json'

let fireApp = Firebase.initializeApp(auth)

export default function (path) {
  this.db = fireApp.database().ref(`${path}/japa`)
  this.add = (obj) => {
    this.db.push(obj)
  }
  this.check = function (id) {
    return new Promise((resolve, reject) => {
      this.db.orderByChild('id').equalTo(id).once('value', snapshot => {
        if (snapshot.val()) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
  this.get = function (obj) {
    return new Promise((resolve, reject) => {
      this.db.orderByChild('id').equalTo(obj.id).once('value', snapshot => {
        if (snapshot.val()) {
          resolve(snapshot)
        } else {
          reject('Not found')
        }
      })
    })
  }
  return this
}
