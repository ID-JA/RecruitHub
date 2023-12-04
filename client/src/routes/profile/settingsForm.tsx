import { PasswordInput, Button, Group, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

export function SettingsForm() {
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
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Title
          order={5}
          style={{ borderBottom: '2px solid #333', display: 'inline-block', marginTop: '10px' }}
        >
          Change password
        </Title>
        <PasswordInput
          withAsterisk
          variant='filled'
          label='Current Password'
          radius='md'
          mb='16px'
          mt='16px'
          placeholder='Enter your current password'
          {...form.getInputProps('currentPassword')}
        />
        <PasswordInput
          withAsterisk
          variant='filled'
          label='New Password'
          radius='md'
          mb='16px'
          placeholder='Enter your new password'
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          withAsterisk
          variant='filled'
          label='Confirm your new Password'
          radius='md'
          mb='16px'
          placeholder='Enter your password'
          {...form.getInputProps('confirmNewPassword')}
        />
        <Group justify='flex-end' mt='md'>
          <Button type='submit' radius='md'>
            Update
          </Button>
        </Group>
      </form>
    </div>
  );
}
