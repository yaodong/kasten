import React, { useState, useEffect, useContext } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import { useParams } from 'react-router-dom'
import Header from '../components/Header'
import { UserContext, FirebaseContext } from '../contexts'

const ReadPage = () => {
  const { id } = useParams()
  const firebase = useContext(FirebaseContext)
  const { user } = useContext(UserContext)

  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  useEffect(() => {
    async function init () {
      const note = await firebase.getNote(user.id, id)
      setEditorState(EditorState.createWithContent(convertFromRaw(note.content)))
    }
    init()
  }, [firebase, id, user, setEditorState])

  return (
    <div className='container'>
      <Header />
      <div className='page'>
        <Editor
          editorState={editorState}
          readOnly
          onChange={null}
        />
      </div>
    </div>
  )
}

export default ReadPage
