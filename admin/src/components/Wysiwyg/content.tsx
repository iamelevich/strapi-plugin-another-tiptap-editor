import { InferProps } from 'prop-types';
import React from 'react';
import { propTypes } from './props';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Box } from '@strapi/design-system/Box';
import { Stack } from '@strapi/design-system/Stack';
import { useIntl, MessageDescriptor } from 'react-intl';
import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  FieldInput,
  FieldAction,
} from '@strapi/design-system/Field';
import { Typography } from '@strapi/design-system/Typography';
import Editor from '../Editor';
import getTrad from '../../utils/get-trad';
import { PluginSettings } from '../../../../common/settings';

function WysiwygContent({
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
}: InferProps<typeof WysiwygContent.propTypes> & { settings: PluginSettings }): React.ReactElement {
  const { formatMessage } = useIntl();

  const editor = useEditor({
    extensions: [
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
    ],
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
}

WysiwygContent.propTypes = propTypes;

export default WysiwygContent;
