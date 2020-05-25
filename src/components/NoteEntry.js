import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
  return (
    <div className='entry'>
      <div className='entry_id'>
        <Link to={`/read/${id}`}>
          {id}
        </Link>
      </div>
      <div className='entry_preview'>
        {content ? <Excerpt content={content} /> : ''}
      </div>
      <div className='entry_actions'>
        <Link to={`/write/${id}`}>Edit</Link>
      </div>
    </div>
  )
}

Entry.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired
}

export default Entry
