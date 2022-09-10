import React from 'react';
import { Editor } from '@tiptap/core';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/get-trad';
import { PluginSettings } from '../../../../common/settings';

// Icons
import { VscFileCode, VscClearAll, VscHorizontalRule } from 'react-icons/vsc';
import { AiOutlineRedo, AiOutlineUndo } from 'react-icons/ai';
import { GrBlockQuote } from 'react-icons/gr';
import { TbClearFormatting } from 'react-icons/tb';
import { IoMdReturnLeft } from 'react-icons/io';

// Design
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import TextStyleTool, { getSelectedTextStyle } from './tools/TextStyleTool';
import ListStyleTool from './tools/ListStyleTool';
import HistoryTool from './tools/HistoryTool';
import ClearTool from './tools/ClearTool';

function Toolbar({
  editor,
  settings,
}: {
  editor: Editor;
  settings: PluginSettings;
}): React.ReactElement | null {
  const { formatMessage } = useIntl();

  if (!editor) {
    return null;
  }

  return (
    <Box padding={2} className="toolbar">
      <Flex justifyContent="flex-start" className='toolbar-flex' style={{ flexWrap: 'wrap' }}>
        <TextStyleTool
          editor={editor}
          settings={settings}
          selectedTextStyle={getSelectedTextStyle({ editor, settings })}
        />
        <ListStyleTool editor={editor} settings={settings} />
        {settings.blockquote ? (
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            label={formatMessage({
              id: getTrad('editor.toolbar.blockquote'),
              defaultMessage: 'Blockquote',
            })}
            icon={<GrBlockQuote />}
          />
        ) : null}
        {settings.codeBlock ? (
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
            label={formatMessage({
              id: getTrad('editor.toolbar.codeBlock'),
              defaultMessage: 'Code Block',
            })}
            icon={<VscFileCode />}
          />
        ) : null}
        <ClearTool editor={editor} settings={settings} />
        {settings.horizontalRule ? (
          <IconButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            label={formatMessage({
              id: getTrad('editor.toolbar.horizontalRule'),
              defaultMessage: 'Horizontal Rule',
            })}
            icon={<VscHorizontalRule />}
          />
        ) : null}
        {settings.hardBreak ? (
          <IconButton
            onClick={() => editor.chain().focus().setHardBreak().run()}
            label={formatMessage({
              id: getTrad('editor.toolbar.hardBreak'),
              defaultMessage: 'Hard Break',
            })}
            icon={<IoMdReturnLeft />}
          />
        ) : null}
        <HistoryTool editor={editor} settings={settings} />
      </Flex>
    </Box>
  );
}

export default Toolbar;
