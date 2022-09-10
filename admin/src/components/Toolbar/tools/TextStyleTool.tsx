import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import { PluginSettings } from '../../../../../common/settings';
import getTrad from '../../../utils/get-trad';
import TextStyleButtons from './TextStyleButtons';

// Design
import { Box } from '@strapi/design-system/Box';
import { IconButton } from '@strapi/design-system/IconButton';
import { Select, Option } from '@strapi/design-system/Select';

// Icons
import { FaParagraph } from 'react-icons/fa';
import { onHeadingChange } from '../utils/editor';

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
        <TextStyleButtons editor={editor} settings={settings} />
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
      <TextStyleButtons editor={editor} settings={settings} />
    </>
  );
}

export default TextStyleTool;
