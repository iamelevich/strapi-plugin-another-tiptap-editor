import React from 'react';

// Design
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Stack } from '@strapi/design-system/Stack';
import { Grid } from '@strapi/design-system/Grid';

type BaseBlockProps = React.PropsWithChildren<{
  title: string;
}>;

const BaseBlock: React.FC<BaseBlockProps> = ({ children, title }) => {
  return (
    <Box
      background="neutral0"
      hasRadius
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={7}
      paddingRight={7}
    >
      <Stack spacing={4}>
        <Typography variant="delta" as="h2">
          {title}
        </Typography>
        <Grid gap={6}>{children}</Grid>
      </Stack> 
    </Box>
  );
};

export default BaseBlock;
