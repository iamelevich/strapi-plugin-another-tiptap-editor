import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import { PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';

// Design
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';

// Icons
import { AiOutlineRedo, AiOutlineUndo } from 'react-icons/ai';

type HistoryToolProps = {
  editor: Editor;
  settings: PluginSettings;
};

const HistoryTool: React.FC<HistoryToolProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();

  if (settings.history) {
    return (
      <IconButtonGroup>
        <IconButton
          onClick={() => editor.chain().focus().undo().run()}
          label={formatMessage({
            id: getTrad('editor.toolbar.undo'),
            defaultMessage: 'Undo',
          })}
          icon={<AiOutlineUndo />}
        />
        <IconButton
          onClick={() => editor.chain().focus().redo().run()}
          label={formatMessage({
            id: getTrad('editor.toolbar.redo'),
            defaultMessage: 'Redo',
          })}
          icon={<AiOutlineRedo />}
        />
      </IconButtonGroup>
    );
  }

  return null;
};

export default HistoryTool;
