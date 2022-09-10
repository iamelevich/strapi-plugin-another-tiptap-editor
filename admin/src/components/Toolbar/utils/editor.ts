import { Editor } from "@tiptap/core";
import { HeadingLevel, PluginSettings } from "../../../../../common/settings";

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

export { getSelectedTextStyle, onHeadingChange };
