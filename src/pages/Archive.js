import React, { useState, useEffect, useContext } from 'react'
import { UserContext, FirebaseContext } from '../contexts'
import Header from '../components/Header'
import NoteEntry from '../components/NoteEntry'

const ArchivePage = () => {
  const [notes, setNotes] = useState([])
  const { user } = useContext(UserContext)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const loadNotes = async () => {
      const notes = await firebase.listNotes(user.id)
      setNotes(notes)
    }
    loadNotes()
  }, [firebase, user, setNotes])

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

export default ArchivePage
