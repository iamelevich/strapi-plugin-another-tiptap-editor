import React, { useState } from 'react';
import { Editor as TipTapEditor, EditorContent } from '@tiptap/react';
import Toolbar from '../Toolbar';
import StyledBox from './styles';
import { PluginSettings } from '../../../../common/settings';

import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import getTrad from '../../utils/get-trad';
import { useIntl } from 'react-intl';

type EditorProps = {
  editor: TipTapEditor;
  settings: PluginSettings;
};

const Editor: React.FC<EditorProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();
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
      {settings.wordCount ? (
        <Typography variant="delta" as="p" style={{ textAlign: 'right', padding: '4px 8px' }}>
          {formatMessage({
            id: getTrad('editor.wordCount'),
            defaultMessage: '{words, plural, =0 {no words} one {# word} other {# words}}'
          }, {
            words: editor.storage.characterCount.words()
          })}
        </Typography>
      ) : null}
    </StyledBox>
  );
};

export default Editor;
