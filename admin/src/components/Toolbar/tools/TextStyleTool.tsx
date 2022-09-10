import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import { HeadingLevel, PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';

// Design
import { Box } from '@strapi/design-system/Box';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import { Select, Option } from '@strapi/design-system/Select';

// Icons
import { FaParagraph } from 'react-icons/fa';
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough } from 'react-icons/ai';
import { VscCode } from 'react-icons/vsc';

type HeadingStyle = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph';

const onHeadingChange = (editor: Editor, type: HeadingStyle) => {
  if (type === 'paragraph') {
    return editor.chain().focus().setParagraph().run();
  }
  const level = parseInt(type.replace('h', '')) as HeadingLevel;
  editor.chain().focus().toggleHeading({ level }).run();
};

const getSelectedTextStyle = ({
  editor,
  settings,
}: {
  editor: Editor;
  settings: PluginSettings;
}) => {
  let selectedTextStyle = 'none';
  if (editor.isActive('paragraph')) {
    selectedTextStyle = 'paragraph';
  } else {
    for (const heading of settings.headings) {
      if (editor.isActive('heading', { level: heading })) {
        selectedTextStyle = `h${heading}`;
        break;
      }
    }
  }
  return selectedTextStyle;
};

function StyleButtons({ editor, settings }: { editor: Editor; settings: PluginSettings }) {
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
}

function TextStyleTool({
  editor,
  settings,
  selectedTextStyle,
}: {
  editor: Editor;
  settings: PluginSettings;
  selectedTextStyle: string;
}) {
  const { formatMessage } = useIntl();

  if (settings.headings.length === 0) {
    return (
      <>
        <IconButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
          label={formatMessage({
            id: getTrad('editor.toolbar.paragraph'),
            defaultMessage: 'Paragraph',
          })}
          icon={<FaParagraph />}
        />
        <StyleButtons editor={editor} settings={settings} />
      </>
    );
  }

  const textStyleOptions = [
    <Option value={'paragraph'}>
      {formatMessage({
        id: getTrad('editor.toolbar.paragraph'),
        defaultMessage: 'Paragraph',
      })}
    </Option>,
  ];
  for (const heading of settings.headings) {
    textStyleOptions.push(
      <Option value={`h${heading}`}>
        {formatMessage({ id: getTrad('editor.toolbar.heading'), defaultMessage: 'Heading' }) +
          ` ${heading}`}
      </Option>
    );
  }

  return (
    <>
      <Box>
        <Select
          required
          size="S"
          placeholder={formatMessage({
            id: getTrad('editor.toolbar.textStyle'),
            defaultMessage: 'Text Style',
          })}
          onChange={(val) => onHeadingChange(editor, val)}
          value={selectedTextStyle}
        >
          {...textStyleOptions}
        </Select>
      </Box>
      <StyleButtons editor={editor} settings={settings} />
    </>
  );
}

export { getSelectedTextStyle };

export default TextStyleTool;
