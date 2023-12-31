import { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Checkbox,
  Text,
  Stack,
  NumberInput,
  Select,
  PasswordInput
} from '@mantine/core';
import '@mantine/dates/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import BaseModal from '../components/shared/modal/base-modal';
import { notifications } from '@mantine/notifications';
import { DateInput } from '@mantine/dates';

const schema = z.object({
  password: z.string(),
  application_id: z.string(),
  date: z.date(),
  duration: z.number()
});

export default function CreateInterviewModal() {
  const [createotherinterview, setCreateOtherInterview] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const [applications, setApplications] = useState([]);
  const [dataApp, setDataApp] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/recruiter/accepted-applications`)
      .then((response) => {
        console.log(response.data.applications);
        if (response.data.applications) {
          setApplications(response.data.applications);
        }
      })
      .catch(() => {
        alert('Something went wrong');
      });
  }, []);

  useEffect(() => {
    if (applications.length > 0) {
      const newdata = applications.map((application) => ({
        value: application.id.toString(),
        label: application.candidate.name
      }));
      setDataApp(newdata);
    }
  }, [applications]);

  const mutation = useMutation({
    mutationFn: async (data: TInterviewData) => {
      console.log(data);
      const response = await axiosInstance.post('/interviews/create', data);
      console.log(response);
      const updatedData = dataApp.filter((item) => item.value !== data.application_id.toString());
      setDataApp(updatedData);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Interview created successfully',
        color: 'green'
      });
      if (!createotherinterview) {
        close();
      }
      form.reset();
    },
    onError: (error) => {
      console.log(
        '🚀 ~ file: create-interview-modal.tsx:85 ~ CreateInterviewModal ~ error:',
        error
      );
    }
  });
  const form = useForm<TInterviewData>({
    validate: zodResolver(schema),
    initialValues: {
      password: '',
      application_id: null,
      date: undefined,
      duration: 5
    }
  });

  const Actions = (
    <Flex justify='space-between' align='center' direction='row' px='md' py='lg'>
      <Checkbox
        label='Create another interview'
        value={createotherinterview}
        onChange={(event) => setCreateOtherInterview(event.currentTarget.checked)}
      />
      <Flex justify='flex-end' gap='md'>
        <Button onClick={close} variant='transparent' loading={mutation.isPending}>
          Cancel
        </Button>
        <Button
          onClick={form.onSubmit((values) => {
            mutation.mutate({
              ...values,
              status: 'active'
            });
          })}
          loading={mutation.isPending}
          type='submit'
        >
          Publish
        </Button>
      </Flex>
    </Flex>
  );
  return (
    <>
      <Button onClick={open}>Create Interview</Button>
      <BaseModal
        open={open}
        close={close}
        opened={opened}
        title='Create Interview'
        actions={Actions}
      >
        <form>
          <Text c='gray' size='sm' px='md'>
            Required fields are marked with an asterisk{' '}
            <span style={{ color: 'var(--mantine-color-red-6)' }}>*</span>
          </Text>
          <Stack mt='lg' px='xl'>
            <Select
              data={dataApp}
              label='select a condidate'
              {...form.getInputProps('application_id')}
            />
            <DateInput
              valueFormat='DD/MM/YYYY HH:mm:ss'
              label='Start Date'
              placeholder='Enter Date when the room start'
              withAsterisk
              {...form.getInputProps('date')}
            />
            <PasswordInput
              label='Room Password'
              placeholder='Enter password for the room'
              withAsterisk
              {...form.getInputProps('password')}
            />
            <NumberInput
              {...form.getInputProps('duration')}
              label='Room Duration'
              placeholder='Enter Duration for the room'
              withAsterisk
              min={0}
              max={40}
            />
          </Stack>
        </form>
      </BaseModal>
    </>
  );
}
