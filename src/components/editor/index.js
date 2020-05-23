import React from 'react'
import { convertFromRaw, Editor, EditorState, convertToRaw, RichUtils, getDefaultKeyBinding } from 'draft-js'
import Toolbar from './Toolbar';

const CustomEditor = ({ content, onSubmit }) => {
  const [editorState, setEditorState] = React.useState(() =>
    content ? EditorState.createWithContent(convertFromRaw(content)) : EditorState.createEmpty()
  )

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style))
  }

  const toggleBlockType = (style) => {
    setEditorState(RichUtils.toggleBlockType(editorState, style))
  }

  const onSave = async (e) => {
    e.preventDefault()
    onSubmit(convertToRaw(editorState.getCurrentContent()))
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
        4, /* maxDepth */
      )
      if (newEditorState !== editorState) {
        setEditorState(newEditorState)
      }
      return
    }
    return getDefaultKeyBinding(e)
  }

  return (
    <div className="editor">
      <div className="editor__header">
        <button onClick={onSave}>Save</button>
      </div>
      <Toolbar
        editorState={editorState}
        onToggleBlockType={toggleBlockType}
        onToggleInlineStyle={toggleInlineStyle}
      />
      <div className="editor__content">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
        />
      </div>
      <div className="editor__footer">
      </div>
    </div>
  )
}

export default CustomEditor
