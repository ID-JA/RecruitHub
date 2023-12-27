import {
  TextInput,
  PasswordInput,
  Textarea,
  Button,
  Group,
  Title,
  Text,
  Anchor
} from '@mantine/core';
import { ChangeEvent, useState } from 'react';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';

const signUpSchemaRecruiter = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(6, { message: 'Password should have at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password should have at least 6 characters' }),
    companyName: z.string()
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match'
      });
    }
  });

export function TalentForm() {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: zodResolver(signUpSchemaRecruiter)
  });
  const [userData, setuserData] = useState({
    name: '',
    email: '',
    password: ''
  });

  //  handle input changes
  const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <div>
      <div style={{ margin: '15px' }}>
        <Title ta='center' order={3}>
          We Bring Job Offers to You!
        </Title>
        <Text ta='center' maw='430px' size='xs'>
          Join thousands of people who’ve found their dream job using Hired.
        </Text>
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
          name='email'
          withAsterisk
          variant='filled'
          label='Email'
          radius='md'
          mb='16px'
          placeholder='your@email.com'
          onChange={handleInputChanges}
          value={userData.email}
        />

        <PasswordInput
          name='password'
          withAsterisk
          variant='filled'
          label='Password'
          radius='md'
          mb='16px'
          placeholder='Enter your password'
          onChange={handleInputChanges}
          value={userData.name}
        />
        <PasswordInput
          variant='filled'
          label='Confirm Password'
          radius='md'
          mb='16px'
          placeholder='confirm your password'
          {...form.getInputProps('password')}
        />

        <Group justify='flex-end' mt='md'>
          <Button type='submit'>Get Started</Button>
        </Group>
      </form>
    </div>
  );
}
