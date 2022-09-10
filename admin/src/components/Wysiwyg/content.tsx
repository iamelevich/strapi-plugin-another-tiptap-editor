import React from 'react';
import { useIntl, MessageDescriptor } from 'react-intl';
import { WysiwygContentProps } from './types';
import Editor from '../Editor';
import getTrad from '../../utils/get-trad';

// Design
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { FieldLabel } from '@strapi/design-system/Field';
import { Typography } from '@strapi/design-system/Typography';

// TipTap
import { Extensions, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';

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
    StarterKit.configure({
      heading: {
        levels: settings.headings,
      },
      bold: settings.bold ? undefined : false,
      italic: settings.italic ? undefined : false,
      strike: settings.strike ? undefined : false,

      code: settings.code ? undefined : false,
      codeBlock: settings.codeBlock ? undefined : false,

      orderedList: settings.orderedList ? undefined : false,
      bulletList: settings.bulletList ? undefined : false,

      blockquote: settings.blockquote ? undefined : false,
      hardBreak: settings.hardBreak ? undefined : false,
      horizontalRule: settings.horizontalRule ? undefined : false,
      history: settings.history ? undefined : false,
    }),
  ];

  if (settings.wordCount) {
    extensions.push(CharacterCount)
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
