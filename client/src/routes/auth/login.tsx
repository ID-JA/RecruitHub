import { Link, Route } from '@tanstack/react-router';
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
  Anchor,
  Text
} from '@mantine/core';
import { RecruitHubLogo } from '../../components/shared/logo/logo';
import { authenticationSchema, useAuthenticate } from '../../api/auth-service';

import { zodResolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';

export default function Login() {
  const { authenticate, mutation } = useAuthenticate();

  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validate: zodResolver(authenticationSchema)
  });
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
        component='form'
        onSubmit={form.onSubmit(authenticate)}
      >
        <Flex justify='center' mb='md'>
          <RecruitHubLogo />
        </Flex>
        <TextInput label='Email' placeholder='your@gmail.com' {...form.getInputProps('email')} />
        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          {...form.getInputProps('password')}
        />
        <Group justify='space-between' mt='lg'>
          <Checkbox label='Remember me' />
          <Link to='/forgot-password'>
            <Text size='sm'>Forgot password?</Text>
          </Link>
        </Group>
        <Button fullWidth mt='xl' type='submit' loading={mutation.isPending}>
          Sign in
        </Button>
        <Text mt='md' c='dimmed' size='sm' ta='center'>
          <Link to='/signup'>Create account</Link>
        </Text>
      </Paper>
    </Flex>
  );
}

export const loginRoute = new Route({
  path: 'login',
  component: Login,
  getParentRoute: () => defaultLayoutRoute
});
