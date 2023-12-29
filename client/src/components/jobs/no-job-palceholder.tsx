import { Flex, Text, Title } from '@mantine/core';
import { IconArchive } from '@tabler/icons-react';

function NoJobsPlaceholder() {
  return (
    <Flex h='500' justify='center' align='center'>
      <Flex direction='column' align='center'>
        <IconArchive size={50} color='gray' />
        <Title order={4} ta='center' mt='md'>
          No job offers available yet.
        </Title>
        <Text ta='center' mt='sm'>
          Seems like you're early! Create a new job offer to get started.
        </Text>
      </Flex>
    </Flex>
  );
}

export default NoJobsPlaceholder;
