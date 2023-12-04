import React from 'react';
import {
  TextInput,
  PasswordInput,
  Textarea,
  Checkbox,
  Button,
  Group,
  Title,
  Text,
  Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form';

export function EmployerForm() {
  const form = useForm({
    initialValues: {
      fname: '',
      lname: '',
      company: '',
      email: '',
      password: ''
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    }
  });
  return (
    <div>
      <div style={{ margin: '15px' }}>
        <Title ta='center' order={3}>
          Try Recruit Hub!
        </Title>
        <Text ta='center'> We have 20k+ qualified candidates waiting for you!</Text>
        <Text size='sm' ta='center' mt={5}>
          You already joined us?{' '}
          <Anchor href='/login' size='sm'>
            {' '}
            sign in
          </Anchor>
        </Text>
      </div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          variant='filled'
          label='Full Name'
          radius='md'
          mb='16px'
          mt='10px'
          placeholder='your full name'
          {...form.getInputProps('fname')}
        />
        <Textarea
          variant='filled'
          radius='md'
          mb='16px'
          label='where do you live'
          placeholder='your place'
          {...form.getInputProps('live')}
        />
        <TextInput
          withAsterisk
          variant='filled'
          label='Email'
          radius='md'
          mb='16px'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          variant='filled'
          label='Password'
          radius='md'
          mb='16px'
          placeholder='Enter your password'
          {...form.getInputProps('password')}
        />
        <PasswordInput
          withAsterisk
          variant='filled'
          label='Confirm Password'
          radius='md'
          mb='16px'
          placeholder='confirm your password'
          {...form.getInputProps('password')}
        />

        <Checkbox
          mt='md'
          label='I agree to sell my privacy'
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group justify='flex-end' mt='md'>
          <Button type='submit'>Get Started</Button>
        </Group>
      </form>
    </div>
  );
}
