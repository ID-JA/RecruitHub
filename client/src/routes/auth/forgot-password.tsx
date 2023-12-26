import { Link, Route } from '@tanstack/react-router';
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
  rem,
  Flex
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';

export function ForgotPassword() {
  return (
    <Container h='100vh'>
      <Flex align='center' justify='center' h='100vh' maw='500px' m='auto' w='100%'>
        <Paper withBorder p={30} radius='md' w='100%'>
          <Title order={3} ta='center'>
            Forgot your password?
          </Title>
          <Text c='dimmed' fz='sm' ta='center'>
            Enter your email to get a reset link
          </Text>
          <TextInput label='Your email' placeholder='you@gmail.com' required />
          <Group justify='space-between' mt='lg'>
            <Anchor c='dimmed' size='sm'>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Link to='/login'>
                  <Text ml={5}>Back to the login page</Text>
                </Link>
              </Center>
            </Anchor>
            <Button>Reset password</Button>
          </Group>
        </Paper>
      </Flex>
    </Container>
  );
}

export const forgotPasswordRoute = new Route({
  path: 'forgot-password',
  component: ForgotPassword,
  getParentRoute: () => defaultLayoutRoute
});
