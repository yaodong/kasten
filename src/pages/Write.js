import React, { useState, useEffect, useCallback, useContext } from 'react'
import Editor from '../components/editor'
import Header from '../components/Header'
import { FirebaseContext } from '../contexts'

const WritePage = () => {
  const [docId, setDocId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState(null)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    const init = async () => {
      if (!docId && content) {
        const id = await firebase.createNote()
        setDocId(id)
      }
    }
    init()
  }, [firebase, docId, content])

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
        <Editor onChange={setContent} />
      </div>
    </div>
  )
}

export default WritePage
