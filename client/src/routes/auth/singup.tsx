import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, rem, Paper } from '@mantine/core';

import { SignUpForm } from '../../components/auth/SignupTabs';

export function SignUp() {
  return (
    <Container size='lg'>
      <Paper
        style={{
          maxWidth: rem(600),
          margin: 'auto',
          padding: rem(20),
          marginTop: '40px'
        }}
        withBorder
      >
        <SignUpForm />
      </Paper>
    </Container>
  );
}

export const signUpRoute = new Route({
  path: 'signup',
  component: SignUp,
  getParentRoute: () => defaultLayoutRoute
});
