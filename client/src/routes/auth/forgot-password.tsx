import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  rem
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

export function ForgotPassword() {
  return (
    <Container size={460} my={30}>
      <Title ta='center'>Forgot your password?</Title>
      <Text c='dimmed' fz='sm' ta='center'>
        Enter your email to get a reset link
      </Text>

      <Paper
        withBorder
        shadow='md'
        p={30}
        radius='md'
        mt='xl'
        style={{ backgroundColor: '#F5F7F8' }}
      >
        <TextInput label='Your email' placeholder='you@gmail.com' required />
        <Group justify='space-between' mt='lg'>
          <Anchor c='dimmed' size='sm'>
            <Center inline>
              <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              <Box ml={5}>Back to the login page</Box>
            </Center>
          </Anchor>
          <Button>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}

export const forgotPasswordRoute = new Route({
  path: 'forgot-password',
  component: ForgotPassword,
  getParentRoute: () => defaultLayoutRoute
});
