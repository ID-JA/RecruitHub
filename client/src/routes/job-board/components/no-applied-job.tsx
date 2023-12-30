import { Flex, Text, Title } from '@mantine/core';
import { IconMessageReport } from '@tabler/icons-react';

export function NoAppliedJobs() {
  return (
    <Flex h='500' justify='center' align='center'>
      <Flex direction='column' align='center'>
        <IconMessageReport size={50} color='gray' />
        <Title order={4} ta='center' mt='md'>
          You have not applied to any jobs yet.
        </Title>
        <Text ta='center' mt='sm'>
          Seems like you're early! Create a new job offer to get started.
        </Text>
      </Flex>
    </Flex>
  );
}

export default NoAppliedJobs;
