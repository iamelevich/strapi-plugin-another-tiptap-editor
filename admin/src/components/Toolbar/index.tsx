import React from 'react';
import { useIntl } from 'react-intl';
import { Editor } from '@tiptap/core';
import getTrad from '../../utils/get-trad';
import { PluginSettings } from '../../../../common/settings';
import { getSelectedTextStyle } from './utils/editor';

// Icons
import { VscHorizontalRule } from 'react-icons/vsc';
import { GrBlockQuote } from 'react-icons/gr';
import { IoMdReturnLeft } from 'react-icons/io';

// Design
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';

// Tools
import ListStyleTool from './tools/ListStyleTool';
import HistoryTool from './tools/HistoryTool';
import ClearTool from './tools/ClearTool';
import TextStyleTool from './tools/TextStyleTool';
import CodeBlockTool from './tools/CodeBlockTool';

type ToolbarProps = {
  editor: Editor;
  settings: PluginSettings;
};

const Toolbar: React.FC<ToolbarProps> = ({ editor, settings }) => {
  const { formatMessage } = useIntl();

  if (!editor) {
    return null;
  }

  return (
    <Box padding={2} className="toolbar">
      <Flex justifyContent="flex-start" className="toolbar-flex" style={{ flexWrap: 'wrap' }}>
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
        <CodeBlockTool editor={editor} settings={settings} />
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
};

export default Toolbar;
