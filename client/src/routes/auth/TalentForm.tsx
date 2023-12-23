import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Title,
  Text,
  Anchor
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';

const signUpSchemaRecruiter = z.object({
  firstName: z.string().min(2, { message: 'First name should have at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last name should have at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password should have at least 6 characters' }),
  companyName: z.string().min(1, { message: 'Company name should have at least 1 characters' })
});

export function TalentForm() {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      password: ''
    },
    validate: zodResolver(signUpSchemaRecruiter)
  });
  return (
    <div>
      <div style={{ margin: '15px' }}>
        <Title ta='center' order={3}>
          Try Recruit Hub!
        </Title>
        <Text ta='center' size='xs'>
          We have 20k+ qualified candidates waiting for you!
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextInput
            variant='filled'
            label='First Name'
            radius='md'
            mb='16px'
            mt='10px'
            styles={{ root: { flex: 1 } }}
            placeholder='your first name'
            {...form.getInputProps('firstName')}
          />
          <TextInput
            variant='filled'
            label='Last Name'
            radius='md'
            mb='16px'
            mt='10px'
            styles={{ root: { flex: 1 } }}
            placeholder='your last name'
            {...form.getInputProps('lastName')}
          />
        </div>
        <TextInput
          variant='filled'
          label='Company Name'
          radius='md'
          mb='16px'
          placeholder='your company name'
          {...form.getInputProps('companyName')}
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
          placeholder='Enter your password'
          {...form.getInputProps('password')}
        />

        <Checkbox
          mt='md'
          label='I agree to sell my privacy'
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group justify='flex-end' mt='md'>
          <Button type='submit' radius='md'>
            Get Started
          </Button>
        </Group>
      </form>
    </div>
  );
}
