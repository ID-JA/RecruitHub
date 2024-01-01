import { Link, Route, useNavigate } from '@tanstack/react-router';
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
  Flex,
  PasswordInput
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { axiosInstance } from '../../utils';
import { useState } from 'react';

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    password: null,
    code: null
  });
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    code: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/password/reset', formData);
      if (response) {
        navigate({
          replace: true,
          to: '/login'
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          setError({
            password: error.response.data.errors.password,
            code: error.response.data.errors.code
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container h='100vh'>
      <Flex align='center' justify='center' h='100vh' maw='500px' m='auto' w='100%'>
        <Paper withBorder p={30} radius='md' w='100%'>
          <Title order={3} ta='center'>
            Reset Your Password
          </Title>
          <Text c='dimmed' fz='sm' ta='center'>
            Check the reset code in your email inbox.
          </Text>
          <TextInput
            name='code'
            value={formData.code}
            onChange={handleInputChange}
            label='Enter reset code'
            placeholder='code'
            error={error.code}
            required
          />
          <PasswordInput
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            label='Enter Your New Password'
            placeholder='password'
            error={error.password}
            required
          />
          <Group justify='space-between' mt='lg'>
            <Anchor c='dimmed' size='sm'>
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Link to='/login'>
                  <Text ml={5}>Back to the login page</Text>
                </Link>
              </Center>
            </Anchor>
            <Button onClick={handleSubmit} loading={loading}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </Flex>
    </Container>
  );
}

export const resetPasswordRoute = new Route({
  path: 'reset-password',
  component: ResetPassword,
  getParentRoute: () => defaultLayoutRoute
});
