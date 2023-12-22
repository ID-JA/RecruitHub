import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  rem,
  Flex,
  Checkbox,
  Anchor
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
        <Flex justify='center' mb='md'>
          <RecruitHubLogo />
        </Flex>
        <TextInput label='Email' placeholder='your@gmail.com' required />
        <PasswordInput label='Password' placeholder='Your password' required mt='md' />
        <Group justify='apart' mt='lg'>
          <Checkbox label='Remember me' />
          <Anchor href='/forgot-password' size='sm'>
            {' '}
            Forgot password?
          </Anchor>
        </Group>
        <Button fullWidth mt='xl'>
          Sign in
        </Button>
      </Paper>
    </Flex>
  );
}

export const loginRoute = new Route({
  path: 'login',
  component: Login,
  getParentRoute: () => defaultLayoutRoute
});
