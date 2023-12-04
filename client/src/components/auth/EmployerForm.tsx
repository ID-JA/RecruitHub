import { TextInput, Button, Group, Title, Text, Anchor, Box, Divider } from '@mantine/core';

export function EmployerForm() {
  return (
    <div>
      <Box mt='lg'>
        <Title order={2} fw={700} ta='center'>
          Try Recruit Hub!
        </Title>
        <Text ta='center' size='sm'>
          We have 20k+ qualified candidates waiting for you!{' '}
        </Text>
      </Box>
      <Divider my='xl' />
      <form>
        <TextInput withAsterisk label='Full Name' mb='16px' mt='10px' />
        <TextInput withAsterisk label='Email work' mb='16px' />
        <TextInput withAsterisk mb='16px' label='Company' />
        <Divider my='xl' />

        <Group justify='space-between' mt='md'>
          <Text size='sm'>
            Already have an account?
            <br />
            <Anchor href='/login' size='sm'>
              Sign in
            </Anchor>
          </Text>
          <Button type='submit'>Get Started</Button>
        </Group>
      </form>
    </div>
  );
}
