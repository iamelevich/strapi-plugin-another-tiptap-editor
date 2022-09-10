import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { WysiwygProps } from './types';
import { getSettings } from '../../utils/api';
import getTrad from '../../utils/get-trad';
import pluginId from '../../../../common/pluginId';
import { defaultSettings } from '../../../../common/settings';
import WysiwygContent from './content';

// Design
import { useNotification } from '@strapi/helper-plugin';
import { Loader } from '@strapi/design-system/Loader';
import { Typography } from '@strapi/design-system/Typography';

const Wysiwyg: React.FC<WysiwygProps> = ({
  name,
  onChange,
  value,
  intlLabel,
  labelAction,
  disabled,
  error,
  description,
  required,
}) => {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const {
    data: settings,
    isLoading,
    isError,
    error: getSettingsError,
  } = useQuery(`${pluginId}-settings`, getSettings, {
    onError() {
      toggleNotification({
        // required
        type: 'warning',
        // required
        message: {
          id: getTrad('notification.error.getSettings'),
          defaultMessage: 'Failed to get Wysiwyg editor settings',
        },
      });
    },
    useErrorBoundary: false,
  });
  if (isLoading) {
    return <Loader>Loading component...</Loader>;
  }
  if (isError) {
    return (
      <Typography variant="pi" textColor="danger600">
        {formatMessage({
          id: getTrad('error.requestFailed'),
          defaultMessage: 'Request failed',
        })}
        : {(getSettingsError as Error).message}
      </Typography>
    );
  }
  return (
    <React.StrictMode>
      <WysiwygContent
        name={name}
        onChange={onChange}
        value={value}
        intlLabel={intlLabel}
        labelAction={labelAction}
        disabled={disabled}
        error={error}
        description={description}
        required={required}
        settings={settings || defaultSettings}
      />
    </React.StrictMode>
  );
};

export default Wysiwyg;
