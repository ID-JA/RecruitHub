import { TextInput, Button, Group, Title, Text, Box, Divider } from '@mantine/core';
import { Link } from '@tanstack/react-router';

export function TalentForm() {
  return (
    <>
      <Box mt='lg'>
        <Title order={2} fw={700} ta='center' mb='sm'>
          We Bring Job Offers to You!
        </Title>
        <Text ta='center' size='sm' mx='auto' maw='310px'>
          20k+ found dream jobs on RecruitHub. Join them
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
