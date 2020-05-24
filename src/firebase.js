import { createContext } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

class FirebaseService {
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

  currentUserNotes () {
    return this
      .firestore()
      .collection('users')
      .doc(this.currentUserId())
      .collection('notes')
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
        content,
        updatedTime: this.serverTimestamp()
      })
  }

  async listNotes (userId, lastVisible = null) {
    const query = this.app.firestore().collection('users').doc(userId).collection('notes').orderBy(firebase.firestore.FieldPath.documentId())
    const pageQuery = lastVisible ? query.startAfter(lastVisible).limit(10).get() : query
    const snapshot = await pageQuery.limit(10).get()
    return await snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }))
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

export const FirebaseContext = createContext(null)
