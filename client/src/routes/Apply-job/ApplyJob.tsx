import { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  Container,
  Input,
  Fieldset,
  FileInput,
  rem,
  Flex,
  Text,
  TextInput,
  Stack
} from '@mantine/core';
import { Link, Route, useNavigate, useParams } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { IconFileCv } from '@tabler/icons-react';
import { DateTimePicker } from '@mantine/dates';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

const initialValues = {
  firstName: '',
  lastName: '',
  city: '',
  phone: '',
  email: '',
  resume: '',
  degree: '',
  school: '',
  location: '',
  startDate: '',
  endDate: '',
  role: '',
  company: ''
};

type TApplicantData = typeof initialValues;

export function ApplyJob() {
  const [active, setActive] = useState(0);
  // const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  // const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  const icon = <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;
  const { jobId } = useParams({ strict: false });
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['apply-for-job'],
    mutationFn: async (data: TApplicantData) => {
      const formData = new FormData();
      formData.append('resume', data.resume);
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('city', data.city);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('degree', data.degree);
      formData.append('school', data.school);
      formData.append('location', data.location);
      formData.append('role', data.role);
      formData.append('company', data.company);
      formData.append('start_date', data.startDate);
      formData.append('end_date', data.endDate);
      console.log('🚀 ~ file: ApplyJob.tsx:51 ~ mutationFn: ~ data:', data);
      const response = await axiosInstance.post(`/candidate/apply/${jobId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    },
    onSuccess(result) {
      navigate({
        to: '/jobs-board',
        hash: 'applied',
        replace: true
      });
      notifications.show({
        title: 'Success',
        message: 'Your application registered with success',
        color: 'green'
      });
    },
    onError(error) {
      notifications.show({
        title: 'Error',
        message: 'Something went wrong',
        color: 'red'
      });
    }
  });

  const form = useForm({
    initialValues
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 4 ? current + 1 : current;
    });

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const handleSubmit = () => {
    mutation.mutate(form.values);
  };
  return (
    <Container>
      <Stepper active={active} onStepClick={(step) => setActive(step)}>
        <Stepper.Step label='First step' description='Personal information'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '65px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <Link to='/jobs-board' hash='latest'>
                  <Button variant='transparent'>Skip</Button>
                </Link>
              </Group>

              <Text style={{ fontSize: '24px', fontWeight: '500' }}>
                Add your contact information
              </Text>
              <Stack mt='md'>
                <TextInput withAsterisk label='First Name' {...form.getInputProps('firstName')} />
                <TextInput withAsterisk label='Last Name' {...form.getInputProps('lastName')} />
                <TextInput withAsterisk label='Email' {...form.getInputProps('email')} />
                <TextInput withAsterisk label='Contact phone' {...form.getInputProps('phone')} />
                <TextInput withAsterisk label='City' {...form.getInputProps('city')} />
              </Stack>
              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>

        <Stepper.Step label='Second step' description='Add a resume'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '20px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>
              <Text style={{ fontSize: '24px', fontWeight: '500', paddingBottom: '18px' }}>
                Add a resume for the employer
              </Text>
              <FileInput
                clearable
                accept='application/pdf'
                aria-placeholder='Upload your CV'
                rightSection={icon}
                rightSectionPointerEvents='none'
                {...form.getInputProps('resume')}
              />
              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>
        <Stepper.Step label='Third step' description='Education'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '30px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>
              <Text style={{ fontSize: '24px', fontWeight: '500', paddingBottom: '18px' }}>
                Enter your Education information
              </Text>

              <Stack>
                <TextInput withAsterisk label='Degree' {...form.getInputProps('degree')} />
                <TextInput
                  withAsterisk
                  label='University / Institute'
                  {...form.getInputProps('school')}
                />
                <TextInput withAsterisk label='Location' {...form.getInputProps('location')} />

                <DateTimePicker label='Start date' {...form.getInputProps('start_date')} />
                <DateTimePicker label='End date' {...form.getInputProps('end_date')} />
              </Stack>
              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>
        <Stepper.Step label='Fourth step' description='Experience'>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '20px', paddingTop: '20px' }}>
              <Group justify='flex-end'>
                <a href='/jobs-board'>
                  <Button
                    className='skip'
                    color='blue'
                    radius='md'
                    variant='transparent'
                    style={{ height: '26px' }}
                  >
                    Skip
                  </Button>
                </a>
              </Group>
              <Text style={{ fontSize: '24px', fontWeight: '500', paddingBottom: '18px' }}>
                Enter a past job that shows relevant experience{' '}
              </Text>
              <TextInput mb='md' withAsterisk label='Role' {...form.getInputProps('role')} />
              <TextInput withAsterisk label='Company' {...form.getInputProps('company')} />
              <Group justify='center' mt='xl'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>Submit your application</Button>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Step>
        <Stepper.Completed>
          <Flex justify='center' align='center' style={{ height: '100%' }}>
            <Fieldset style={{ width: '450px', paddingLeft: '20px', paddingTop: '20px' }}>
              <Group justify='center' mt='xl'>
                <Text
                  style={{
                    fontSize: '24px',
                    fontWeight: '500',
                    paddingRight: '5px',
                    paddingLeft: '10px'
                  }}
                >
                  You did it!
                </Text>
              </Group>
              <Group justify='center'>
                <Text
                  style={{
                    fontSize: '24px',
                    fontWeight: '500',
                    paddingBottom: '18px',
                    paddingRight: '5px',
                    paddingLeft: '10px'
                  }}
                >
                  Your application was sent.
                </Text>
              </Group>

              <Group justify='center' mt='xl'>
                <a href='/jobs-board'>
                  <Button onClick={nextStep} style={{ width: '120px' }}>
                    Finish{' '}
                  </Button>
                </a>
              </Group>
            </Fieldset>
          </Flex>
        </Stepper.Completed>
      </Stepper>
    </Container>
  );
}

export const ApplyJobRoute = new Route({
  path: '/apply-job/$jobId',
  component: ApplyJob,
  getParentRoute: () => defaultLayoutRoute
});
