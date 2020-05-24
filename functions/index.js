const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createNote = functions.https.onCall((data, context) => {
  const docId = Math.floor((new Date().getTime() / 1000)).toString();
  const docRef = admin.firestore().collection('users').doc(context.auth.uid).collection('notes').doc(docId);

  return new Promise((resolve, reject) => {
    docRef.get()
      .then(doc => {
        if (doc.exists) {
          return reject(new Error({ reason: 'EXISTS', message: 'Doc ref already exists' }));
        } else {
          docRef.set({
            id: docId,
            createdTime: admin.firestore.FieldValue.serverTimestamp()
          })
          return resolve({ docId })
        }
      })
      .catch(err => {
        reject(err)
      });
  })
});
