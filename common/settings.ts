type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type PluginSettings = {
  // Test styles
  headings: HeadingLevel[];
  bold: boolean;
  italic: boolean;
  strike: boolean;

  // Code
  code: boolean;
  codeBlock: boolean;

  // List styles
  orderedList: boolean;
  bulletList: boolean;

  // Genral
  blockquote: boolean;
  horizontalRule: boolean;
  hardBreak: boolean;
  history: boolean;
  clearFormatting: boolean;
  clearNodes: boolean;

  wordCount: boolean;
};

const defaultSettings: PluginSettings = {
  headings: [1, 2, 3, 4, 5, 6],
  blockquote: true,
  bold: true,
  bulletList: true,
  code: true,
  codeBlock: true,
  hardBreak: true,
  history: true,
  horizontalRule: true,
  italic: true,
  orderedList: true,
  strike: true,
  clearFormatting: true,
  clearNodes: true,
  wordCount: true,
};

const availableOptions = {
  headings: [1, 2, 3, 4, 5, 6]
}

export { PluginSettings, HeadingLevel, defaultSettings, availableOptions };
