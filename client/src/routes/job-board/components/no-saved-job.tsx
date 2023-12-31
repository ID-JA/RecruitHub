import { Flex, Text, Title } from '@mantine/core';
import { IconHeartOff } from '@tabler/icons-react';

export function NoSavedJobs() {
  return (
    <Flex h='500' justify='center' align='center'>
      <Flex direction='column' align='center'>
        <IconHeartOff size={50} color='gray' />
        <Title order={4} ta='center' mt='md'>
          You do not have any saved jobs.
        </Title>
        <Text ta='center' mt='sm'>
          Seems like you're early! Create a new job offer to get started.
        </Text>
      </Flex>
    </Flex>
  );
}

export default NoSavedJobs;
