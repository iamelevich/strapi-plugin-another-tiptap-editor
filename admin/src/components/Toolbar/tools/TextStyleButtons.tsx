import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import { PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';

// Design
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';

// Icons
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough } from 'react-icons/ai';
import { VscCode } from 'react-icons/vsc';

type TextStyleButtonsProps = { editor: Editor; settings: PluginSettings };

const TextStyleButtons: React.FC<TextStyleButtonsProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();
  const buttonsList: React.ReactElement[] = [];

  // Bold
  if (settings.bold) {
    buttonsList.push(
      <IconButton
        key="bold-button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
        label={formatMessage({
          id: getTrad('editor.toolbar.bold'),
          defaultMessage: 'Bold',
        })}
        icon={<AiOutlineBold />}
      />
    );
  }

  // Italic
  if (settings.italic) {
    buttonsList.push(
      <IconButton
        key="italic-button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
        label={formatMessage({
          id: getTrad('editor.toolbar.italic'),
          defaultMessage: 'Italic',
        })}
        icon={<AiOutlineItalic />}
      />
    );
  }

  // Strike
  if (settings.strike) {
    buttonsList.push(
      <IconButton
        key="strike-button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
        label={formatMessage({
          id: getTrad('editor.toolbar.strike'),
          defaultMessage: 'Strike',
        })}
        icon={<AiOutlineStrikethrough />}
      />
    );
  }

  // Code
  if (settings.code) {
    buttonsList.push(
      <IconButton
        key="code-button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
        label={formatMessage({
          id: getTrad('editor.toolbar.inlineCode'),
          defaultMessage: 'Inline Code',
        })}
        icon={<VscCode />}
      />
    );
  }

  if (buttonsList.length > 1) {
    return <IconButtonGroup>{buttonsList}</IconButtonGroup>;
  }
  return <>{buttonsList}</>;
};

export default TextStyleButtons;
