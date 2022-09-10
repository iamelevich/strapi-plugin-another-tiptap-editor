import getTrad from "../../../../../utils/get-trad";

const layout = [
  {
    intlLabel: {
      id: getTrad('settings.text.bold.label'),
      defaultMessage: 'Bold',
    },
    description: {
      id: getTrad('settings.text.bold.hint'),
      defaultMessage:
        'Should bold option be available in editor?',
    },
    name: 'bold',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.text.italic.label'),
      defaultMessage: 'Italic',
    },
    description: {
      id: getTrad('settings.text.italic.hint'),
      defaultMessage:
        'Should italic option be available in editor?',
    },
    name: 'italic',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.text.strike.label'),
      defaultMessage: 'Strike',
    },
    description: {
      id: getTrad('settings.text.strike.hint'),
      defaultMessage:
        'Should strike option be available in editor?',
    },
    name: 'strike',
    type: 'bool',
    size: {
      col: 12,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.text.code.label'),
      defaultMessage: 'Inline Code',
    },
    description: {
      id: getTrad('settings.text.code.hint'),
      defaultMessage:
        'Should inline code option be available in editor?',
    },
    name: 'code',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.text.codeBlock.label'),
      defaultMessage: 'Code Block',
    },
    description: {
      id: getTrad('settings.text.codeBlock.hint'),
      defaultMessage:
        'Should code block option be available in editor?',
    },
    name: 'codeBlock',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.text.orderedList.label'),
      defaultMessage: 'Ordered List',
    },
    description: {
      id: getTrad('settings.text.orderedList.hint'),
      defaultMessage:
        'Should ordered list option be available in editor?',
    },
    name: 'orderedList',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.text.bulletList.label'),
      defaultMessage: 'Bullet List',
    },
    description: {
      id: getTrad('settings.text.bulletList.hint'),
      defaultMessage:
        'Should bullet list option be available in editor?',
    },
    name: 'bulletList',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
];

export default layout;
