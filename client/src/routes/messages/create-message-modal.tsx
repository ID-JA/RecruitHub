import {  useState } from 'react';
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
import { TMessageData } from '../../types';

const schema = z.object({ 
  message: z.string(),
  receiver_id: z.number(),

});

export default function CreateMessageModal({receiverId}) {

  const [sendothermessage, setSendOtherMessage] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure();
  
  const mutation = useMutation({
    mutationFn: async (data: TMessageData) => {
      const response = await axiosInstance.post('/chats/messages/send', data);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Message was sent successfully',
        color: 'green'
      });
      if (!sendothermessage) {
        close();
      }
      form.setFieldValue('message','');
    },
    onError: (error) => {
      console.log(
        '🚀 ~ file: create-message-modal.tsx:62 ~ CreateMessageModal ~ error:',
        error
      );
    }
  });
  
  const form = useForm<TMessageData>({
    validate: zodResolver(schema),
    initialValues: {
      message: '',
      receiver_id: receiverId,
    }
  });


  const Actions = (
    <Flex justify='space-between' align='center' direction='row' px='md' py='lg'>
      <Checkbox
        label='Send another message'
        value={sendothermessage}
        onChange={(event) => setSendOtherMessage(event.currentTarget.checked)}
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
              h={'100%'}
              label='Message'
              placeholder='Enter Message'
              withAsterisk
              {...form.getInputProps('message')}
              autosize
              minRows={10}
            />
           
          </Stack>
        </form>
      </BaseModal>
    </>
  );
}
