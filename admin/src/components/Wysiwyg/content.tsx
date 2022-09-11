import React from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import { WysiwygContentProps } from './types';
import Editor from '../Editor';
import getTrad from '../../utils/get-trad';
import { lowlight } from 'lowlight/lib/all';

// Design
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { FieldLabel } from '@strapi/design-system/Field';
import { Typography } from '@strapi/design-system/Typography';

// TipTap
import { Extensions, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import Document from '@tiptap/extension-document';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import History from '@tiptap/extension-history';
import Focus from '@tiptap/extension-focus';

const WysiwygContent: React.FC<WysiwygContentProps> = ({
  name,
  onChange,
  value,
  intlLabel,
  labelAction,
  disabled,
  error,
  description,
  required,
  settings,
}) => {
  const { formatMessage } = useIntl();

  const extensions: Extensions = [
    Document,
    Paragraph,
    Text,
    Dropcursor,
    Gapcursor,
    Heading.configure({
      levels: settings.headings,
    }),
    Focus,
  ];

  // Setup Bold
  if (settings.bold) {
    extensions.push(Bold);
  }

  // Setup Italic
  if (settings.italic) {
    extensions.push(Italic);
  }

  // Setup Strike
  if (settings.strike) {
    extensions.push(Strike);
  }

  // Setup Code
  if (settings.code) {
    extensions.push(Code);
  }

  // Setup Blockquote
  if (settings.blockquote) {
    extensions.push(Blockquote);
  }

  // Setup BulletList
  if (settings.bulletList) {
    extensions.push(BulletList);
  }

  // Setup OrderedList
  if (settings.orderedList) {
    extensions.push(OrderedList);
  }

  // Setup ListItem
  if (settings.bulletList || settings.orderedList) {
    extensions.push(ListItem);
  }

  // Setup HardBreak
  if (settings.hardBreak) {
    extensions.push(HardBreak);
  }

  // Setup HorizontalRule
  if (settings.horizontalRule) {
    extensions.push(HorizontalRule);
  }

  // Setup word count feature
  if (settings.wordCount) {
    extensions.push(CharacterCount);
  }

  // Setup Lowlight
  if (settings.codeBlock) {
    extensions.push(
      CodeBlockLowlight.configure({
        lowlight,
      })
    );
  }

  // Setup History
  if (settings.history) {
    extensions.push(History);
  }

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate(ctx) {
      onChange({ target: { name, value: ctx.editor.getHTML() } });
    },
  });

  if (editor === null) {
    return (
      <Typography variant="pi">
        {formatMessage({
          id: getTrad('error.editorIniticialization'),
          defaultMessage: 'Editor initialization failed',
        })}
      </Typography>
    );
  }

  // Update content if value is changed outside (Mainly for i18n)
  if (editor !== null && editor.getHTML() !== value) {
    editor.commands.setContent(value || null);
  }

  return (
    <Stack spacing={1}>
      <Box>
        <FieldLabel action={labelAction} required={required}>
          {formatMessage(intlLabel as MessageDescriptor)}
        </FieldLabel>
      </Box>
      <Editor editor={editor} settings={settings} />
      {error && (
        <Typography variant="pi" textColor="danger600">
          {formatMessage({ id: error, defaultMessage: error })}
        </Typography>
      )}
      {description && (
        <Typography variant="pi">{formatMessage(description as MessageDescriptor)}</Typography>
      )}
    </Stack>
  );
};

export default WysiwygContent;
