import React, { useState } from 'react';
import { EditorContent } from '@tiptap/react';
import Toolbar from '../Toolbar';
import StyledBox from './styles';

function Editor({ editor, settings }): React.ReactElement {
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
      <Toolbar editor={editor} settings={settings} />
      <EditorContent editor={editor} />
    </StyledBox>
  );
}

export default Editor;
