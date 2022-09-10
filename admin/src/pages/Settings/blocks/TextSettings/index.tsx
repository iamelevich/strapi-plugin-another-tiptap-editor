import React from 'react';
import getTrad from '../../../../utils/get-trad';
import { useIntl } from 'react-intl';
import BaseBlock from '../BaseBlock';
import { availableOptions, PluginSettings } from '../../../../../../common/settings';
import { FormikProps } from 'formik';
import layout from './utils/layout';

// Design
import { GenericInput } from '@strapi/helper-plugin';
import { Select, Option } from '@strapi/design-system/Select';
import { GridItem } from '@strapi/design-system/Grid';

const TextSettings: React.FC<FormikProps<PluginSettings>> = ({
  values,
  errors,
  handleChange,
  isSubmitting,
}) => {
  const { formatMessage } = useIntl();

  return (
    <BaseBlock
      title={formatMessage({
        id: getTrad('settings.text.title'),
        defaultMessage: 'Text settings',
      })}
    >
      <GridItem col={12} s={12}>
        <Select
          label={formatMessage({
            id: getTrad('settings.text.heading.label'),
            defaultMessage: 'Headings',
          })}
          value={values.headings}
          hint={formatMessage({
            id: getTrad('settings.text.heading.hint'),
            defaultMessage: 'Heading sizes that will be available in your editor.',
          })}
          onChange={(e) => {
            console.log(e);
            handleChange({ target: { name: 'headings', value: e } });
          }}
          multi
          withTags
        >
          {availableOptions.headings.map((heading) => {
            return (
              <Option key={`heading-${heading}`} value={heading}>
                {formatMessage(
                  {
                    id: getTrad('settings.text.heading.option'),
                    defaultMessage: 'Heading {heading}',
                  },
                  {
                    heading,
                  }
                )}
              </Option>
            );
          })}
        </Select>
      </GridItem>
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

export default TextSettings;
