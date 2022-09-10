import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import { PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';

// Design
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';

// Icons
import { TbClearFormatting } from 'react-icons/tb';
import { VscClearAll } from 'react-icons/vsc';

type ClearToolProps = {
  editor: Editor;
  settings: PluginSettings;
};

const ClearTool: React.FC<ClearToolProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();
  const buttonsList: React.ReactElement[] = [];

  if (settings.clearFormatting) {
    buttonsList.push(
      <IconButton
        key="clear-formatting-button"
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        label={formatMessage({
          id: getTrad('editor.toolbar.clearFormatting'),
          defaultMessage: 'Clear Formattig',
        })}
        icon={<TbClearFormatting />}
      />
    );
  }

  if (settings.clearNodes) {
    buttonsList.push(
      <IconButton
        key="clear-nodes-button"
        onClick={() => editor.chain().focus().clearNodes().run()}
        label={formatMessage({
          id: getTrad('editor.toolbar.clearNode'),
          defaultMessage: 'Clear Node',
        })}
        icon={<VscClearAll />}
      />
    );
  }

  if (buttonsList.length > 1) {
    return <IconButtonGroup>{buttonsList}</IconButtonGroup>;
  }
  return <>{buttonsList}</>;
};

export default ClearTool;
