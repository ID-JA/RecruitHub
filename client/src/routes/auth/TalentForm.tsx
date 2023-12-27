import { TextInput, PasswordInput, Button, Group, Title, Text, Anchor } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { registerUser } from '../../api/auth-service';
import { notifications } from '@mantine/notifications';

export function TalentForm({ form }: { form: any }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.history.replace('/login');
    },
    onError: (error) => {
      console.log('🚀 ~ file: TalentForm.tsx:15 ~ TalentForm ~ error:', error);
      notifications.show({
        color: 'red',
        title: 'Something went wrong',
        message: error.response.data.message
      });
    }
  });

  const handleSubmit = (values: any) => {
    const { fullName, ...rest } = values;
    mutation.mutate({
      name: fullName,
      role: 'candidate',
      ...rest
    });
  };
  return (
    <>
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          variant='filled'
          label='Full Name'
          radius='md'
          mb='16px'
          mt='10px'
          placeholder='your full name'
          {...form.getInputProps('fullName')}
        />
        <TextInput
          variant='filled'
          radius='md'
          mb='16px'
          label='where do you live'
          placeholder='your place'
          {...form.getInputProps('location')}
        />
        <TextInput
          name='email'
          withAsterisk
          variant='filled'
          label='Email'
          radius='md'
          mb='16px'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
        />

        <PasswordInput
          name='password'
          withAsterisk
          variant='filled'
          label='Password'
          radius='md'
          mb='16px'
          placeholder='Enter your password'
          {...form.getInputProps('password')}
        />
        <PasswordInput
          variant='filled'
          label='Confirm Password'
          radius='md'
          mb='16px'
          placeholder='confirm your password'
          {...form.getInputProps('confirmPassword')}
        />

        <Group justify='flex-end' mt='md'>
          <Button type='submit' loading={mutation.isPending}>
            Get Started
          </Button>
        </Group>
      </form>
    </>
  );
}
