import { Link, Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button
} from '@mantine/core';

export default function Login() {
  return (
    <Container size={420} my={40}>
      {<Link to='/profile'>go to profile page</Link>}
      <Title fw='900' ta='center'>
        Welcome back!
      </Title>
      <Text ta='center'> you've been missed</Text>
      <Text color='dimmed' size='sm' ta='center' mt={5}>
        Do not have an account yet?{' '}
        <Anchor href='/signup' size='sm'>
          {' '}
          Create account
        </Anchor>
      </Text>

      <Paper
        withBorder
        shadow='md'
        p={30}
        mt={30}
        radius='md'
        style={{
          backgroundColor: '#F5F7F8'
        }}
      >
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
    </Container>
  );
}

export const loginRoute = new Route({
  path: 'login',
  component: Login,
  getParentRoute: () => defaultLayoutRoute
});
