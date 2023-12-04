import { TextInput, Button, Group, Title, Text, Box, Divider, Anchor } from '@mantine/core';

export function TalentForm() {
  return (
    <>
      <Box mt='lg'>
        <Title order={2} fw={700} ta='center'>
          We Bring Job Offers to You!
        </Title>
        <Text ta='center' size='sm'>
          Join thousands of people who’ve found their dream job using RecruitHub.
        </Text>
      </Box>
      <Divider my='xl' />

      <form>
        <Group grow gap='lg' mb='md'>
          <TextInput label='First Name' placeholder='first name' />
          <TextInput label='Last Name' placeholder='last name' />
        </Group>
        <TextInput withAsterisk label='Email' mb='16px' placeholder='your@email.com' />

        <TextInput withAsterisk label='Where do you live?' mb='16px' placeholder='City' />
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
    </>
  );
}
