import { Link, Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Group,
  Button,
  Divider,
  Stack,
  rem,
  Flex
} from '@mantine/core';
import { RecruitHubLogo } from '../../components/shared/logo/logo';

export default function Login() {
  return (
    <Flex justify='center' align='center' h='100vh' w='100vw'>
      <Paper
        radius='lg'
        style={{
          padding: rem(40),
          maxWidth: '28rem',
          width: '100%'
        }}
        withBorder
      >
        <Flex justify='center'>
          <RecruitHubLogo />
        </Flex>

        <Text c='dimmed' size='sm' ta='center' mt='sm'>
          Empower your journey in our Applicant Tracking System.
        </Text>

        <Divider my='lg' />
        <form>
          <Stack>
            <TextInput required label='Email' />
            <PasswordInput required label='Password' />
          </Stack>
          <Group justify='space-between' mt='xl'>
            <Link to='/signup'>
              <Text component='span' c='dimmed' tt='none' size='sm'>
                Don't have an account? Register
              </Text>
            </Link>
            <Button type='submit' radius='xl'>
              Sign in
            </Button>
          </Group>
        </form>
      </Paper>
    </Flex>
  );
}

export const loginRoute = new Route({
  path: 'login',
  id: 'signin',
  component: Login,
  getParentRoute: () => defaultLayoutRoute
});
