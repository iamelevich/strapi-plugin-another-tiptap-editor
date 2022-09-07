/*
 * SettingsPage of the plugin
 */

import React from 'react';
import { Main } from '@strapi/design-system/Main';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import getTrad from '../../utils/getTrad';
import { useIntl } from 'react-intl';

const Settings: React.FunctionComponent = () => {
  const { formatMessage } = useIntl();

  return (
    <Main aria-busy="true">
      <SettingsPageTitle
        name={formatMessage({
          id: getTrad('Settings.label'),
          defaultMessage: 'Settings',
        })}
      />
      <HeaderLayout
        title={formatMessage({
          id: getTrad('Settings.label'),
          defaultMessage: 'Settings',
        })}
      />
      <ContentLayout>
        <p>test</p>
      </ContentLayout>
    </Main>
  );
};

export default Settings;
