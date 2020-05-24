import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'
import pako from 'pako'

const deflate = content => window.btoa(pako.deflate(JSON.stringify(content), { to: 'string' }))
const inflate = content => JSON.parse(pako.inflate(window.atob(content), { to: 'string' }))

class FirebaseService {
  get pageSize () {
    return 100
  }

  constructor (config) {
    this.app = firebase.initializeApp(config)
  }

  auth () {
    return this.app.auth()
  }

  firestore () {
    return this.app.firestore()
  }

  currentUser () {
    return this.app.auth().currentUser
  }

  currentUserId () {
    return this.currentUser().uid
  }

  async signIn () {
    const authProvider = new firebase.auth.GoogleAuthProvider()
    await this.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    await firebase.auth().signInWithPopup(authProvider)
  }

  async signOut () {
    await this.auth().signOut()
  }

  serverTimestamp () {
    return firebase.firestore.FieldValue.serverTimestamp()
  }

  async createNote () {
    const f = this.app.functions().httpsCallable('createNote')
    const res = await f({})
    return res.data.docId
  }

  async updateNote (id, content) {
    this.firestore().collection('users').doc(this.currentUserId())
      .collection('notes').doc(id).update({
        content: deflate(content),
        updatedTime: this.serverTimestamp()
      })
  }

  async listNotes (userId, lastVisible = null) {
    const query = this.app.firestore().collection('users').doc(userId).collection('notes').orderBy('id', 'desc')
    const pageQuery = lastVisible ? query.startAfter(lastVisible).limit(this.pageSize) : query
    const snapshot = await pageQuery.get()
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        content: data.content ? inflate(data.content) : null
      }
    })
  }

  async getNote (userId, docId) {
    const docRef = await this.app.firestore().collection('users').doc(userId).collection('notes').doc(docId).get()
    const data = docRef.data()
    return {
      id: docRef.id,
      content: inflate(data.content)
    }
  }
}

const instance = new FirebaseService({
  appId: process.env.REACT_APP_APP_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
})

export default instance
