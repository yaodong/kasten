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
    async function init () {
      if (docId) {
        const note = await firebase.getNote(user.id, docId)
        setContent(note.content)
      }
      setReady(true)
    }

    init()
  }, [firebase, user, docId])

  const save = useCallback(() => {
    async function saveNote () {
      setSaving(true)
      const id = docId || await firebase.createNote()
      docId || setDocId(id)
      await firebase.updateNote(id, content)
      setTimeout(() => setSaving(false), 500)
    }

    saveNote()
  }, [firebase, docId, content])

  return (
    <div className='container'>
      <Header>
        <span className='text-gray-500'>
          {docId || 'never saved'}
        </span>
        <button className={`nav_actions--primary ${saving ? '--disabled' : ''}`} onClick={save}>Save</button>
      </Header>
      <div className='page'>
        {ready ? <Editor onContentChange={setContent} content={content} /> : ''}
      </div>
    </div>
  )
}

export default WritePage
