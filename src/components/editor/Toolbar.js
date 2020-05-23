import React from 'react'

const INLINE_TYPES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
]

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
]

const StyleButton = ({ label, style, onToggle, active }) => {
  const className = active ? 'active' : ''
  const onMouseDown = (e) => {
    e.preventDefault()
    onToggle(style)
  }
  return <button onMouseDown={onMouseDown} className={className}>{label}</button>
}

const BlockStyleControls = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection()
  const blockTypeAtKey = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return BLOCK_TYPES.map((type) =>
    <StyleButton
      key={type.label}
      label={type.label}
      style={type.style}
      onToggle={onToggle}
      active={blockTypeAtKey === type.style}
    />
  )
}

const InlineStyleControls = ({ editorState, onToggle }) => {
  const currentStyle = editorState.getCurrentInlineStyle()

  return INLINE_TYPES.map((type) =>
    <StyleButton
      key={type.label}
      label={type.label}
      style={type.style}
      onToggle={onToggle}
      active={currentStyle.has(type.style)}
    />
  )
}

const Toolbar = ({ editorState, onToggleInlineStyle, onToggleBlockType }) => {
  return (
    <div className="toolbar">
      <InlineStyleControls editorState={editorState} onToggle={onToggleInlineStyle} />
      <BlockStyleControls editorState={editorState} onToggle={onToggleBlockType} />
    </div>
  )
}

export default Toolbar
