import { Flex, Text, Title } from '@mantine/core';
import { IconArchive } from '@tabler/icons-react';
import CreateEditCompanyModel from './create-edit-company-model';

export function NoCompanyPlaceHolder() {
  return (
    <Flex h='500' justify='center' align='center'>
      <Flex direction='column' align='center'>
        <IconArchive size={50} color='gray' />
        <Title order={4} ta='center' mt='md'>
          No company available yet.
        </Title>
        <Text ta='center' my='sm'>
          to get started you need to create a company you hiring for.
        </Text>
        <CreateEditCompanyModel />
      </Flex>
    </Flex>
  );
}
