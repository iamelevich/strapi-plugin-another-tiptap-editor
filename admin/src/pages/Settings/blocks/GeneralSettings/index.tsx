import React from 'react';
import getTrad from '../../../../utils/get-trad';
import { useIntl } from 'react-intl';
import BaseBlock from '../BaseBlock';
import { availableOptions, PluginSettings } from '../../../../../../common/settings';
import { FormikProps } from 'formik';
import layout from './utils/layout';

// Design
import { GenericInput } from '@strapi/helper-plugin';
import { GridItem } from '@strapi/design-system/Grid';

const GeneralSettings: React.FC<FormikProps<PluginSettings>> = ({
  values,
  errors,
  handleChange,
  isSubmitting,
}) => {
  const { formatMessage } = useIntl();

  return (
    <BaseBlock
      title={formatMessage({
        id: getTrad('settings.general.title'),
        defaultMessage: 'General settings',
      })}
    >
      {layout.map((input) => {
        let value = values[input.name];

        if (!value) {
          value = input.type === 'bool' ? false : '';
        }

        return (
          <GridItem key={input.name} {...input.size}>
            <GenericInput
              {...input}
              value={value}
              error={errors[input.name]}
              onChange={handleChange}
            />
          </GridItem>
        );
      })}
    </BaseBlock>
  );
};

export default GeneralSettings;
