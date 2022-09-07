import { InferProps } from 'prop-types';
import React from 'react';
import { propTypes } from './props';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
}: InferProps<typeof WysiwygContent.propTypes>): React.ReactElement {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>',
  });

  return <EditorContent editor={editor} />;
}

WysiwygContent.propTypes = propTypes;

export default WysiwygContent;
