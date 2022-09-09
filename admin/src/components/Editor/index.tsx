import React, { useState } from 'react';
import { EditorContent } from '@tiptap/react';
import Toolbar from './toolbar';
import StyledBox from './styles';

function Editor({ editor }): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledBox
      className={isFocused ? 'focused' : ''}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </StyledBox>
  );
}

export default Editor;
