import React from 'react';
import { EditorContent } from '@tiptap/react';
import Toolbar from './toolbar';
import StyledBox from './styles';

function Editor({ editor }): React.ReactElement {
  return (
    <StyledBox>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </StyledBox>
  );
}

export default Editor;
