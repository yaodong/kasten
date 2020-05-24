import React, { useState, useEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { FirebaseContext } from '../firebase'
import { AuthActions } from '../store/auth'
import { AuthShape } from '../store/shapes'
import Header from '../components/Header'
import NoteEntry from '../components/NoteEntry'

const ArchivePage = ({ auth }) => {
  console.log('in page', auth)
  const [notes, setNotes] = useState([])
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const loadNotes = async () => {
      const notes = await firebase.listNotes(auth.userId)
      setNotes(notes)
    }
    loadNotes()
  }, [firebase, auth, setNotes])

  return (
    <div className='container'>
      <Header />
      <div className='page'>
        {
          notes.map(n => (
            <NoteEntry key={n.id} id={n.id} content={n.content} />
          ))
        }
      </div>
    </div>
  )
}

ArchivePage.propTypes = {
  auth: AuthShape
}

ArchivePage.defaultProps = {
  auth: {}
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  signIn: () => dispatch({ type: AuthActions.SIGN_IN }),
  signOut: () => dispatch({ type: AuthActions.SIGN_OUT })
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArchivePage)
