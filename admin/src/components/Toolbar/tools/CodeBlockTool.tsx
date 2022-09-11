import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import { PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';

// Design
import { IconButton } from '@strapi/design-system/IconButton';

// Icons
import { VscFileCode } from 'react-icons/vsc';

type CodeBlockToolProps = {
  editor: Editor;
  settings: PluginSettings;
};

const CodeBlockTool: React.FC<CodeBlockToolProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();

  if (settings.codeBlock) {
    return (
      <>
        <IconButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          label={formatMessage({
            id: getTrad('editor.toolbar.codeBlock'),
            defaultMessage: 'Code Block',
          })}
          icon={<VscFileCode />}
        />
      </>
    );
  }

  return null;
};

export default CodeBlockTool;
