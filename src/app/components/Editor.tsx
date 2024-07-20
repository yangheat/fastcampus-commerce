'use client'

import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import { Dispatch, SetStateAction } from 'react'
import { EditorProps, EditorState } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Button from './Button'

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
)

export default function CustomEditor({
  editorState,
  readOnly = false,
  onEditorStateChange,
  onSave
}: {
  editorState: EditorState | undefined
  readOnly?: boolean
  onEditorStateChange?: Dispatch<SetStateAction<EditorState>>
  onSave?: () => void
}) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        toolbarClassName="toolbar-class"
        wrapperClassName="wrappe-class"
        editorClassName="editor-class"
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link']
        }}
        localization={{ locale: 'ko' }}
        onEditorStateChange={onEditorStateChange}
      />
      {!readOnly && <Button onClick={onSave}>Save</Button>}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 16px;
`
