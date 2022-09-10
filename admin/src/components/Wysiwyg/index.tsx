import { InferProps } from 'prop-types';
import React from 'react';
import { propTypes } from './props';
import { useQuery } from 'react-query';
import { defaultSettings } from '../../../../common/settings';
import { getSettings } from '../../utils/api';
import WysiwygContent from './content';
import { Loader } from '@strapi/design-system/Loader';
import { Typography } from '@strapi/design-system/Typography';
import { useNotification } from '@strapi/helper-plugin';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/get-trad';
import pluginId from '../../../../common/pluginId';

function Wysiwyg({
  name,
  onChange,
  value,
  intlLabel,
  labelAction,
  disabled,
  error,
  description,
  required,
}: InferProps<typeof Wysiwyg.propTypes>): React.ReactElement {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const {
    data: settingsFromDB,
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
  const settings = { ...defaultSettings, ...settingsFromDB };
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
        settings={settings}
      />
    </React.StrictMode>
  );
}

Wysiwyg.defaultProps = {
  description: '',
  disabled: false,
  error: undefined,
  intlLabel: '',
  required: false,
  value: '',
  settings: {},
};

Wysiwyg.propTypes = propTypes;

export default Wysiwyg;
