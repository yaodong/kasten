import React, { useState } from 'react'
import { convertFromRaw, Editor, EditorState, convertToRaw, RichUtils, getDefaultKeyBinding } from 'draft-js'
import Toolbar from './Toolbar'

const CustomEditor = ({ content, onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    content ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty()
  )

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  const toggleBlockType = (style) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style))
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return true
    }
    return false
  }

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4 /* maxDepth */
      )
      if (newEditorState !== editorState) {
        setEditorState(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  const _onChange = (content) => {
    setEditorState(content)
    onChange(convertToRaw(editorState.getCurrentContent()))
  }

  return (
    <div className='editor'>
      <Toolbar
        editorState={editorState}
        onToggleBlockType={toggleBlockType}
        onToggleInlineStyle={toggleInlineStyle}
      />
      <div className='editor__content'>
        <Editor
          editorState={editorState}
          onChange={_onChange}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
        />
      </div>
    </div>
  )
}

export default CustomEditor
