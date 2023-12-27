import { TextInput, PasswordInput, Button, Group, Title, Text, Anchor } from '@mantine/core';
import { useRouter } from '@tanstack/react-router';

export function EmployerForm({ form }: { form: any }) {
  const router = useRouter();
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


      <form
        onSubmit={form.onSubmit(() => {
          router.history.push('/signup#company-details');
        })}
      >
        <Group mb='md' grow>
          <TextInput
            variant='filled'
            label='First Name'
            radius='md'
            placeholder='your first name'
            {...form.getInputProps('firstName')}
          />
          <TextInput
            variant='filled'
            label='Last Name'
            radius='md'
            placeholder='your last name'
            {...form.getInputProps('lastName')}
          />
        </Group>
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
          {...form.getInputProps('confirmPassword')}
        />

        <Group justify='flex-end' mt='md'>
          <Button type='submit' radius='md' onClick={() => {}}>
            Get Started
          </Button>
        </Group>
      </form>
    </div>
  );
}
