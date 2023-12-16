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
import { ChangeEvent, useState } from 'react';
import { useForm } from '@mantine/form';

export function TalentForm() {
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
        <Text ta='center'> Join thousands of people who’ve found their dream job using Hired.</Text>
        <Text size='sm' ta='center' mt={5}>
          You already joined us?{' '}
          <Anchor href='/login' size='sm'>
            {' '}
            sign in
          </Anchor>
        </Text>
      </div>

      <form>
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextInput
            name='name'
            variant='filled'
            label='First Name'
            radius='md'
            mb='16px'
            mt='10px'
            styles={{ root: { flex: 1 } }}
            placeholder='your first name'
            onChange={handleInputChanges}
            value={userData.name}
          />
          <TextInput
            variant='filled'
            label='Last Name'
            radius='md'
            mb='16px'
            mt='10px'
            styles={{ root: { flex: 1 } }}
            placeholder='your last name'
            {...form.getInputProps('lname')}
          />
        </div>
        <TextInput
          variant='filled'
          label='Company Name'
          radius='md'
          mb='16px'
          placeholder='your company name'
          {...form.getInputProps('company')}
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
          placeholder='Enter your password'
          {...form.getInputProps('password')}
        />

        <Checkbox
          mt='md'
          label='I agree to sell my privacy'
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />
        <input type='hidden' name='type_users' value='talent' />

        <Group justify='flex-end' mt='md'>
          <Button type='submit' radius='md'>
            Get Started
          </Button>
        </Group>
      </form>
    </div>
  );
}
