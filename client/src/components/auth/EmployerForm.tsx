import { TextInput, Button, Group, Title, Text, Box, Divider } from '@mantine/core';
import { Link } from '@tanstack/react-router';

export function EmployerForm() {
  return (
    <>
      <Box mt='lg'>
        <Title order={2} fw={700} ta='center' mb='sm'>
          Try Recruit Hub!
        </Title>
        <Text ta='center' size='sm'>
          We have 20k+ qualified candidates waiting for you!
        </Text>
      </Box>
      <Divider my='xl' />

      <form>
        <Group grow gap='lg' mb='md'>
          <TextInput label='First Name' />
          <TextInput label='Last Name' />
        </Group>
        <TextInput withAsterisk label='Email Work' mb='16px' />

        <TextInput withAsterisk label='Company' mb='16px' />
        <Group justify='space-between' mt='md'>
          <Text size='sm'>
            Already have an account?
            <br />
            <Link to='/login'>
              <Text component='span' c='blue' size='sm'>
                Sign in
              </Text>
            </Link>
          </Text>
          <Button type='submit'>Get Started</Button>
        </Group>
      </form>
    </>
  );
}
