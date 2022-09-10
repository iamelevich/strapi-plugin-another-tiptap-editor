import { MessageDescriptor } from 'react-intl';
import { PluginSettings } from '../../../../common/settings';

type WysiwygProps = {
  description: MessageDescriptor,
  disabled: boolean,
  error: string,
  intlLabel: MessageDescriptor,
  labelAction: object,
  name: string,
  onChange: (e: any) => void, // Need to be improved
  required: boolean,
  value: string
};

type WysiwygContentProps = WysiwygProps & {
  settings: PluginSettings
};

export {
  WysiwygProps,
  WysiwygContentProps
}
