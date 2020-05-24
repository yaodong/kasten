import React from 'react'
import { Link } from 'react-router-dom'
const maxLength = 160

export const Excerpt = ({ content }) => {
  const blocks = content.blocks

  let text = ''
  if (blocks.length > 0) {
    text = blocks[0].text
    if (text.length > maxLength) {
      text = text.substr(0, maxLength + 1) + ' ...'
    }
  }

  return text
}

const Entry = ({ id, content }) => {
  console.log('content', content)
  return (
    <div className='entry'>
      <div className='entry_id'>
        <Link to={`/read/${id}`}>
          {id}
        </Link>
      </div>
      <div className='entry_preview'>
        <Link to={`/read/${id}`}>
          {content ? <Excerpt content={content} /> : ''}
        </Link>
      </div>
    </div>
  )
}

export default Entry
