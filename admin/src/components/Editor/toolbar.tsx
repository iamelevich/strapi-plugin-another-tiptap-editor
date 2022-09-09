import React from 'react';
import { Editor } from '@tiptap/core';

// Icons
import { VscCode, VscFileCode, VscClearAll, VscHorizontalRule } from 'react-icons/vsc';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
  AiOutlineRedo,
  AiOutlineUndo,
} from 'react-icons/ai';
import { GrBlockQuote } from 'react-icons/gr';
import { TbClearFormatting } from 'react-icons/tb';
import { IoMdReturnLeft } from 'react-icons/io';

// Design
import { Box } from '@strapi/design-system/Box';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton, IconButtonGroup } from '@strapi/design-system/IconButton';
import { Select, Option } from '@strapi/design-system/Select';

type HeadingStyle = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph';
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const onHeadingChange = (editor: Editor, type: HeadingStyle) => {
  if (type === 'paragraph') {
    return editor.chain().focus().setParagraph().run();
  }
  const level = parseInt(type.replace('h', '')) as HeadingLevel;
  editor.chain().focus().toggleHeading({ level }).run();
};

function Toolbar({ editor }: { editor: Editor }): React.ReactElement | null {
  if (!editor) {
    return null;
  }

  let selectedTextStyle = 'none';
  if (editor.isActive('paragraph')) {
    selectedTextStyle = 'paragraph';
  } else {
    for (let i = 1; i <= 6; i++) {
      if (editor.isActive('heading', { level: i })) {
        selectedTextStyle = `h${i}`;
        break;
      }
    }
  }

  return (
    <Box padding={2} className="toolbox">
      <Flex justifyContent="space-between" style={{ flexWrap: 'wrap' }}>
        <Box>
          <Select
            required
            size="S"
            placeholder="Text style"
            onChange={(val) => onHeadingChange(editor, val)}
            value={selectedTextStyle}
          >
            <Option value={'paragraph'}>Paragraph</Option>
            <Option value={'h1'}>Heading 1</Option>
            <Option value={'h2'}>Heading 2</Option>
            <Option value={'h3'}>Heading 3</Option>
            <Option value={'h4'}>Heading 4</Option>
            <Option value={'h5'}>Heading 5</Option>
            <Option value={'h6'}>Heading 6</Option>
          </Select>
        </Box>
        <IconButtonGroup>
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            label="Bold"
            icon={<AiOutlineBold />}
          />
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            icon={<AiOutlineItalic />}
          />
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            label="Strike"
            icon={<AiOutlineStrikethrough />}
          />
          <IconButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
            label="Inline Code"
            icon={<VscCode />}
          />
        </IconButtonGroup>
        <IconButtonGroup>
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            label="Bullet List"
            icon={<AiOutlineUnorderedList />}
          />
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            label="Ordered List"
            icon={<AiOutlineOrderedList />}
          />
        </IconButtonGroup>
        <IconButtonGroup>
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            label="Blockquote"
            icon={<GrBlockQuote />}
          />
          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
            label="Code Block"
            icon={<VscFileCode />}
          />
        </IconButtonGroup>
        <IconButtonGroup>
          <IconButton
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            label="Clear Formattig"
            icon={<TbClearFormatting />}
          />
          <IconButton
            onClick={() => editor.chain().focus().clearNodes().run()}
            label="Clear Node"
            icon={<VscClearAll />}
          />
        </IconButtonGroup>
        <IconButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          label="Horizontal Rule"
          icon={<VscHorizontalRule />}
        />
        <IconButton
          onClick={() => editor.chain().focus().setHardBreak().run()}
          label="Hard Break"
          icon={<IoMdReturnLeft />}
        />
        <IconButtonGroup>
          <IconButton
            onClick={() => editor.chain().focus().undo().run()}
            label="Undo"
            icon={<AiOutlineUndo />}
          />
          <IconButton
            onClick={() => editor.chain().focus().redo().run()}
            label="Redo"
            icon={<AiOutlineRedo />}
          />
        </IconButtonGroup>
      </Flex>
    </Box>
  );
}

export default Toolbar;
