import { useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Checkbox,
  Text,
  Stack,
  Textarea
} from '@mantine/core';
import '@mantine/dates/styles.css';
import { useDisclosure } from '@mantine/hooks';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import BaseModal from '../../components/shared/modal/base-modal';
import { notifications } from '@mantine/notifications';

const schema = z.object({ 
  password: z.string(),
  application_id: z.string(),
  date: z.date(),
  duration: z.number()
});

export default function CreateMessageModal({id,chat}) {
  console.log(id)
  console.log(chat)
  const [createotherinterview, setCreateOtherInterview] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  const [applications, setApplications] = useState([]);
  const [dataApp, setDataApp] = useState([]);
  console.log(dataApp)
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
      const response = await axiosInstance.post('/chats/messages/send', data);
    
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Message was sent successfully',
        color: 'green'
      });
      if (!createotherinterview) {
        close();
      }
      form.reset();
    },
    onError: (error) => {
      console.log(
        '🚀 ~ file: create-interview-modal.tsx:81 ~ CreateInterviewModal ~ error:',
        error
      );
    }
  });
  const form = useForm<TInterviewData>({
    validate: zodResolver(schema),
    initialValues: {
      message: '',
      receiver_id: null,
      chat_id: null,
    }
  });

  const Actions = (
    <Flex justify='space-between' align='center' direction='row' px='md' py='lg'>
      <Checkbox
        label='Send another message'
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
          Send
        </Button>
      </Flex>
    </Flex>
  );
  return (
    <>
      <Button onClick={open}>Send Message</Button>
      <BaseModal
        open={open}
        close={close}
        opened={opened}
        title='Send Message'
        actions={Actions}
      >
        <form>
          <Text c='gray' size='sm' px='md'>
            Required fields are marked with an asterisk{' '}
            <span style={{ color: 'var(--mantine-color-red-6)' }}>*</span>
          </Text>
          <Stack mt='lg' px='xl'>
            <Textarea
              label='Message'
              placeholder='Enter Message'
              withAsterisk
              {...form.getInputProps('message')}
              autosize
              minRows={5}
              // maxRows={}
            />
            {/* <TextInput
                  label='Message'
                  placeholder='Enter Message'
                  withAsterisk
                  {...form.getInputProps('message')}
                /> */}
          </Stack>
        </form>
      </BaseModal>
    </>
  );
}
