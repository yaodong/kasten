import React, { useState, useEffect, useCallback } from 'react'
import firebaseService from '../firebase'
import Editor from '../components/editor'
import Header from '../components/Header'

const WritePage = props => {
  const [docId, setDocId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [content, setContent] = useState(null)

  useEffect(() => {
    const init = async () => {
      if (!docId && content) {
        const id = await firebaseService.createNote()
        console.log(id)
        setDocId(id)
        console.log(docId)
      }
    }
    init()
  }, [docId, content])

  const save = useCallback(async () => {
    setSaving(true)
    await firebaseService.updateNote(docId, content)
    setSaving(false)
  }, [docId, content])

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
