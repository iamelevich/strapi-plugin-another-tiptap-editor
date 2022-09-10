/*
 * SettingsPage of the plugin
 */

import React from 'react';
import getTrad from '../../utils/get-trad';
import { useIntl } from 'react-intl';
import { getSettings, updateSettings } from '../../utils/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { defaultSettings, PluginSettings } from '../../../../common/settings';
import { Formik } from 'formik';

// Design
import {
  SettingsPageTitle,
  useNotification,
  LoadingIndicatorPage,
  Form,
  useOverlayBlocker,
} from '@strapi/helper-plugin';
import { Main } from '@strapi/design-system/Main';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Button } from '@strapi/design-system/Button';
import { Box } from '@strapi/design-system/Box';
import { Alert } from '@strapi/design-system/Alert';
import { Typography } from '@strapi/design-system/Typography';
import { Check } from '@strapi/icons';
import TextSettings from './blocks/TextSettings';
import GeneralSettings from './blocks/GeneralSettings';
import pluginId from '../../../../common/pluginId';

const Settings: React.FC = () => {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();
  const queryClient = useQueryClient();
  const { lockApp, unlockApp } = useOverlayBlocker();

  const submitMutation = useMutation<{ success: true }, Error, PluginSettings, {}>(updateSettings, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(`${pluginId}-settings`);
      toggleNotification({
        type: 'success',
        message: { id: getTrad('notification.success.saved'), defaultMessage: 'Saved' },
      });

      unlockApp();
    },
    onError() {
      toggleNotification({
        type: 'warning',
        message: { id: getTrad('notification.error'), defaultMessage: 'An error occured' },
      });
    },
  });

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
  const settings: PluginSettings = { ...defaultSettings, ...settingsFromDB };

  if (isLoading) {
    return <LoadingIndicatorPage />;
  }
  if (isError) {
    return (
      <Main aria-busy="true">
        <SettingsPageTitle
          name={formatMessage({
            id: getTrad('settings.title'),
            defaultMessage: 'Another Tiptap Editor plugin',
          })}
        />
        <HeaderLayout
          title={formatMessage({
            id: getTrad('settings.header'),
            defaultMessage: 'Another Tiptap Editor plugin Settings',
          })}
        />
        <ContentLayout>
          <Box
            background="neutral0"
            hasRadius
            paddingTop={6}
            paddingBottom={6}
            paddingLeft={7}
            paddingRight={7}
          >
            <Alert
              title={formatMessage({
                id: getTrad('error.requestFailed'),
                defaultMessage: 'Request failed',
              })}
              variant="danger"
            >
              <Typography variant="pi" textColor="danger600">
                {(getSettingsError as Error).message}
              </Typography>
            </Alert>
          </Box>
        </ContentLayout>
      </Main>
    );
  }

  const { isLoading: isSubmittingForm } = submitMutation;

  return (
    <Main aria-busy={isSubmittingForm}>
      <SettingsPageTitle
        name={formatMessage({
          id: getTrad('settings.title'),
          defaultMessage: 'Another Tiptap Editor plugin',
        })}
      />
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          lockApp();
          await submitMutation.mutateAsync(values);
          setSubmitting(false);
        }}
        initialValues={settings}
        validateOnChange={false}
        // validationSchema={schema}
        enableReinitialize
      >
        {(formikProps) => {
          return (
            <Form>
              <HeaderLayout
                title={formatMessage({
                  id: getTrad('settings.header'),
                  defaultMessage: 'Another Tiptap Editor plugin Settings',
                })}
                primaryAction={
                  <Button
                    loading={formikProps.isSubmitting}
                    type="submit"
                    startIcon={<Check />}
                    size="S"
                  >
                    {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                  </Button>
                }
              />
              <ContentLayout>
                <GeneralSettings {...formikProps} />
                <TextSettings {...formikProps} />
              </ContentLayout>
            </Form>
          );
        }}
      </Formik>
    </Main>
  );
};

export default Settings;
