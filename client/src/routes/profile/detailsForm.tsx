import { TextInput, PasswordInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';

export function DetailsForm() {
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
        <TextInput
          withAsterisk
          variant='filled'
          label='Email'
          radius='md'
          mb='16px'
          mt='10px'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          variant='filled'
          label='Password'
          radius='md'
          mb='16px'
          mt='10px'
          placeholder='Enter your password'
          {...form.getInputProps('password')}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextInput
            variant='filled'
            label='First Name'
            radius='md'
            mb='16px'
            styles={{ root: { flex: 1 } }}
            placeholder='your first name'
            {...form.getInputProps('fname')}
          />
          <TextInput
            variant='filled'
            label='Last Name'
            radius='md'
            mb='16px'
            styles={{ root: { flex: 1 } }}
            placeholder='your last name'
            {...form.getInputProps('lname')}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextInput
            variant='filled'
            label='Company'
            radius='md'
            mb='16px'
            styles={{ root: { flex: 1 } }}
            placeholder='your company name'
            {...form.getInputProps('company')}
          />
          <TextInput
            variant='filled'
            label='Phone number'
            radius='md'
            mb='16px'
            styles={{ root: { flex: 1 } }}
            placeholder='your phone number'
            {...form.getInputProps('phone')}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextInput
            variant='filled'
            label='City '
            radius='md'
            mb='16px'
            styles={{ root: { flex: 1 } }}
            placeholder='your city name'
            {...form.getInputProps('city')}
          />
          <TextInput
            variant='filled'
            label='Country '
            radius='md'
            mb='16px'
            styles={{ root: { flex: 1 } }}
            placeholder='your country name'
            {...form.getInputProps('country')}
          />
        </div>

        <Group justify='flex-end' mt='md'>
          <Button type='submit' radius='md'>
            Update
          </Button>
        </Group>
      </form>
    </div>
  );
}
