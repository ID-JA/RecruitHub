import { Paper, Group, Skeleton, Flex, Box } from '@mantine/core';

function JobCardPlaceholder() {
  return (
    <Paper radius='md' withBorder p='md' component='li'>
      <Group justify='space-between' align='center' grow>
        <Box>
          <Skeleton height={12} width='70%' radius='xl' />
          <Flex align='center' gap='xs' mt='md'>
            <Skeleton height={8} radius='xl' width='20%' />
            <Skeleton height={8} radius='xl' width='20%' />
            <Skeleton height={8} radius='xl' width='20%' />
          </Flex>
        </Box>
        <Flex gap='md' justify='end'>
          <Skeleton height={12} width='20%' radius='xl' />
          <Skeleton height={12} width='20%' radius='xl' />
          <Skeleton height={12} width='20%' radius='xl' />
        </Flex>
      </Group>
    </Paper>
  );
}

export default JobCardPlaceholder;
