import React from 'react';
import { useIntl } from 'react-intl';
import { Editor } from '@tiptap/core';
import { BubbleMenu } from '@tiptap/react';
import { PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';
import { lowlight } from 'lowlight/lib/all';

// Design
import { Box } from '@strapi/design-system/Box';
import { Select, Option } from '@strapi/design-system/Select';

type CodeBubbleMenuProps = {
  editor: Editor;
  settings: PluginSettings;
};

const CodeBubbleMenu: React.FC<CodeBubbleMenuProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();

  if (!settings.codeBlock) {
    return null;
  }

  // Not find a way how to get current node, so use hack with Focus extension
  // https://github.com/ueberdosis/tiptap/issues/3040
  // Also need this variable cause after choosing something there can be no code block with .has-focused class
  let prevCodeElement: Element;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="code-menu"
      shouldShow={() => editor.isActive('codeBlock')}
      tippyOptions={{
        getReferenceClientRect: () => {
          const currentElement = document.querySelector('pre.has-focus');
          if (currentElement) {
            prevCodeElement = currentElement;
          }
          return prevCodeElement.getBoundingClientRect();
        },
        placement: 'top-end',
      }}
    >
      <Box>
        <Select
          required
          disabled={!editor.isActive('codeBlock')}
          size="S"
          placeholder={formatMessage({
            id: getTrad('editor.toolbar.codeLanguage'),
            defaultMessage: 'Choose language',
          })}
          onChange={(val) =>
            editor.chain().updateAttributes('codeBlock', { language: val }).focus().run()
          }
          value={
            editor.isActive('codeBlock') ? editor.getAttributes('codeBlock').language : undefined
          }
        >
          {lowlight.listLanguages().map((language) => (
            <Option value={language} key={language}>
              {language}
            </Option>
          ))}
        </Select>
      </Box>
    </BubbleMenu>
  );
};

export default CodeBubbleMenu;
