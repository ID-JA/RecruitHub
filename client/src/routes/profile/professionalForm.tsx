import { TextInput, Button, Group, Title, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';

export function ProfessionalForm() {
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
  //for start and end year
  //const [value, setValue] = useState<Date | null>(null);

  // Initialize with a default date

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Title
          order={5}
          style={{ borderBottom: '2px solid #333', display: 'inline-block', marginTop: '10px' }}
        >
          Work experience
        </Title>
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextInput
            variant='filled'
            label='First Name'
            radius='md'
            mb='16px'
            mt='10px'
            styles={{ root: { flex: 1 } }}
            placeholder='your first name'
            {...form.getInputProps('fname')}
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <DateInput
            variant='filled'
            radius='md'
            mb='16px'
            valueFormat='YYYY MMM DD'
            label='start year'
            placeholder='start year'
            styles={{ root: { flex: 1 } }}
          />
          <DateInput
            variant='filled'
            radius='md'
            mb='16px'
            valueFormat='YYYY MMM DD'
            label='end year'
            placeholder='end year'
            styles={{ root: { flex: 1 } }}
          />
        </div>

        <Title
          order={5}
          style={{ borderBottom: '2px solid #333', display: 'inline-block', marginTop: '10px' }}
        >
          Education
        </Title>
        <div style={{ display: 'flex', gap: '10px' }}>
          <TextInput
            variant='filled'
            label='School Name'
            radius='md'
            mb='16px'
            mt='10px'
            styles={{ root: { flex: 1 } }}
            placeholder='your first name'
            {...form.getInputProps('fname')}
          />
          <NumberInput
            label='Degree'
            placeholder='Your degree'
            clampBehavior='strict'
            variant='filled'
            styles={{ root: { flex: 1 } }}
            min={0}
            max={100}
            mb='16px'
            mt='10px'
            radius='md'
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <DateInput
            variant='filled'
            radius='md'
            mb='16px'
            valueFormat='YYYY MMM DD'
            label='start year'
            placeholder='start year'
            styles={{ root: { flex: 1 } }}
          />
          <DateInput
            variant='filled'
            radius='md'
            mb='16px'
            valueFormat='YYYY MMM DD'
            label='end year'
            placeholder='end year'
            styles={{ root: { flex: 1 } }}
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
