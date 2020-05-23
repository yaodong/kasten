import React from 'react'
import firebaseService from '../firebase'
import Editor from '../components/editor'

const WritePage = props => {
  const onSubmit = async (content) => {
    await firebaseService.createNote(content)
  }

  return (
    <div className='container'>
      <div className='page'>
        <Editor onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default WritePage
