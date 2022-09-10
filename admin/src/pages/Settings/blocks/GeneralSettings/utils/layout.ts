import getTrad from "../../../../../utils/get-trad";

const layout = [
  {
    intlLabel: {
      id: getTrad('settings.general.blockquote.label'),
      defaultMessage: 'Blockquote',
    },
    description: {
      id: getTrad('settings.general.blockquote.hint'),
      defaultMessage:
        'Should blockquote option be available in editor?',
    },
    name: 'blockquote',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.general.horizontalRule.label'),
      defaultMessage: 'Horizontal Rule',
    },
    description: {
      id: getTrad('settings.general.horizontalRule.hint'),
      defaultMessage:
        'Should horizontal rule option be available in editor?',
    },
    name: 'horizontalRule',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.general.hardBreak.label'),
      defaultMessage: 'Hard Break',
    },
    description: {
      id: getTrad('settings.general.hardBreak.hint'),
      defaultMessage:
        'Should hard break option be available in editor?',
    },
    name: 'hardBreak',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.general.history.label'),
      defaultMessage: 'History (Undo, Redo)',
    },
    description: {
      id: getTrad('settings.general.history.hint'),
      defaultMessage:
        'Should history (undo, redo) option be available in editor?',
    },
    name: 'history',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.general.clearFormatting.label'),
      defaultMessage: 'Clear Formatting',
    },
    description: {
      id: getTrad('settings.general.clearFormatting.hint'),
      defaultMessage:
        'Should clear formatting option be available in editor?',
    },
    name: 'clearFormatting',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
  {
    intlLabel: {
      id: getTrad('settings.general.clearNodes.label'),
      defaultMessage: 'Clear Nodes',
    },
    description: {
      id: getTrad('settings.general.clearNodes.hint'),
      defaultMessage:
        'Should clear nodes option be available in editor?',
    },
    name: 'clearNodes',
    type: 'bool',
    size: {
      col: 6,
      s: 12,
    },
  },
];

export default layout;
