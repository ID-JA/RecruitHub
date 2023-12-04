import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { rem, Paper, Flex } from '@mantine/core';

import { SignUpForm } from '../../components/auth/SignupForm';

export function SignUp() {
  return (
    <Flex justify='center' align='center' h='100vh' w='100vw'>
      <Paper
        shadow='sm'
        radius='lg'
        style={{
          padding: rem(40),
          maxWidth: '28rem',
          width: '100%'
        }}
        withBorder
      >
        <SignUpForm />
      </Paper>
    </Flex>
  );
}

export const signUpRoute = new Route({
  path: 'signup',
  component: SignUp,
  getParentRoute: () => defaultLayoutRoute
});
