import React, { useState, useEffect, useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Editor from '../components/editor'
import Header from '../components/Header'
import { UserContext, FirebaseContext } from '../contexts'

const WritePage = () => {
  const { id } = useParams()
  const [docId, setDocId] = useState(id)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState(null)
  const [ready, setReady] = useState(false)
  const { user } = useContext(UserContext)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const init = async () => {
      if (docId) {
        const note = await firebase.getNote(user.id, docId)
        setContent(note.content)
      } else {
        const id = await firebase.createNote()
        setDocId(id)
      }
      setReady(true)
    }
    init()
  }, [firebase, user, docId, setReady])

  const save = useCallback(async () => {
    setSaving(true)
    await firebase.updateNote(docId, content)
    setTimeout(() => setSaving(false), 500)
  }, [firebase, docId, content])

  return (
    <div className='container'>
      <Header>
        {
          docId
            ? <span className='text-gray-500'>#{docId}</span>
            : ''
        }
        {
          docId
            ? <button className={`nav_actions--primary ${saving ? '--disabled' : ''}`} onClick={save}>Save</button>
            : <button className='nav_actions--primary --disabled'>Save</button>
        }
      </Header>
      <div className='page'>
        {ready ? <Editor onChange={setContent} content={content} /> : ''}
      </div>
    </div>
  )
}

export default WritePage
