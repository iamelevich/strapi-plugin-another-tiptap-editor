import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import { PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';

// Design
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';

// Icons
import { AiOutlineOrderedList, AiOutlineUnorderedList } from 'react-icons/ai';

type ListStyleToolProps = {
  editor: Editor;
  settings: PluginSettings;
};

const ListStyleTool: React.FC<ListStyleToolProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();
  const buttonsList: React.ReactElement[] = [];

  // Ordered List
  if (settings.orderedList) {
    buttonsList.push(
      <IconButton
        key="ordered-list-button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        label={formatMessage({
          id: getTrad('editor.toolbar.orderedList'),
          defaultMessage: 'Ordered List',
        })}
        icon={<AiOutlineOrderedList />}
      />
    );
  }

  // Bullet List
  if (settings.bulletList) {
    buttonsList.push(
      <IconButton
        key="bullet-list-button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        label={formatMessage({
          id: getTrad('editor.toolbar.bulletList'),
          defaultMessage: 'Bullet List',
        })}
        icon={<AiOutlineUnorderedList />}
      />
    );
  }

  if (buttonsList.length > 1) {
    return <IconButtonGroup>{buttonsList}</IconButtonGroup>;
  }
  return <>{buttonsList}</>;
};

export default ListStyleTool;
