import { useState } from 'react';
import {
  Flex,
  Button,
  Checkbox,
  Box,
  ActionIcon,
  Text,
  TextInput,
  Radio,
  Group,
  Stack,
  NumberInput,
  Select,
  Textarea,
  MultiSelect,
  TagsInput
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconX } from '@tabler/icons-react';

import { TextEditor } from '../shared/text-editor';
import { useGeoLocation } from '../../hook/use-geolocation';
import { currencies, industries, salaryTimeFrame } from '../../data';

import { useAuthStore } from '../../store';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import BaseModal from '../shared/modal/base-modal';
import { notifications } from '@mantine/notifications';

const schema = z.object({
  title: z.string(),
  company_id: z.string(),
  location: z.string(),
  employmentType: z.string(),
  category: z.array(z.string()),
  description: z.string(),
  salary: z.number(),
  withMaxSalary: z.boolean().default(false).optional(),
  salaryMax: z.number().optional(),
  salaryCurrency: z.string(),
  salaryTime: z.string(),
  showSalary: z.boolean().optional(),
  howToApply: z.string(),
  motivation: z.string(),
  aboutCompany: z.string(),
  requirements: z.array(z.string())
});

type TJobData = z.infer<typeof schema> & { status: string };

export default function CreateJobModal() {
  const [withRange, setWithRange] = useState(false);
  const queryClient = useQueryClient();

  const { companies } = useAuthStore();
  const [opened, { open, close }] = useDisclosure();
  const { onInputChange, suggestions } = useGeoLocation();
  const mutation = useMutation({
    mutationFn: async (data: TJobData) => {
      const response = await axiosInstance.post('/jobs', data);
      return response.data;
    },
    onSuccess: (data) => {
      notifications.show({
        title: 'Success',
        message: 'Job created successfully',
        color: 'green'
      });
      queryClient.invalidateQueries({
        queryKey: ['my-jobs']
      });
      close();

      console.log('🚀 ~ file: create-job-modal.tsx:88 ~ CreateJobModal ~ data:', data);
    },
    onError: (error) => {
      console.log('🚀 ~ file: create-job-modal.tsx:85 ~ CreateJobModal ~ error:', error);
    }
  });
  const form = useForm<TJobData>({
    validate: zodResolver(schema),
    initialErrors: {
      salary: null
    }
  });

  const Actions = (
    <Flex justify='space-between' align='center' direction='row' px='md' py='lg'>
      <Checkbox label='Create another job' />
      <Flex justify='flex-end' gap='md'>
        <Button onClick={close} variant='transparent' loading={mutation.isPending}>
          Cancel
        </Button>
        <Button
          variant='outline'
          onClick={form.onSubmit((values) => {
            mutation.mutate({
              ...values,
              status: 'pending'
            });
          })}
          loading={mutation.isPending}
        >
          Draft
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
      <Button onClick={open}>Create Job</Button>
      <BaseModal open={open} close={close} opened={opened} title='Create Job' actions={Actions}>
        <form>
          <pre>{JSON.stringify(form.errors, null, 2)}</pre>
          <Text c='gray' size='sm' px='md'>
            Required fields are marked with an asterisk{' '}
            <span style={{ color: 'var(--mantine-color-red-6)' }}>*</span>
          </Text>
          <Stack mt='lg' px='xl'>
            <Select
              data={companies}
              label='select a company'
              {...form.getInputProps('company_id')}
            />
            <TextInput
              label='Job Title'
              placeholder='e.g., Product Manager'
              withAsterisk
              {...form.getInputProps('title')}
            />
            <Select
              searchable
              label='Job Location'
              placeholder='e.g., San Francisco, CA'
              onSearchChange={onInputChange}
              data={suggestions.map((suggestion) => ({
                value: suggestion.displayName,
                label: suggestion.displayName
              }))}
              {...form.getInputProps('location')}
              withAsterisk
            />

            <Radio.Group
              name='employmentType'
              label='Job type'
              withAsterisk
              {...form.getInputProps('employmentType')}
            >
              <Group mt='xs'>
                <Radio value='fullTime' label='Full Time' />
                <Radio value='partTime' label='Part Time' />
                <Radio value='contractor' label='Contractor' />
                <Radio value='temporary' label='Temporary' />
              </Group>
            </Radio.Group>
            <TagsInput label='Requirements' {...form.getInputProps('requirements')} />
            <MultiSelect
              label='Job Category'
              placeholder='Pick value'
              data={industries}
              withAsterisk
              {...form.getInputProps('category')}
            />
            <Box>
              <TextEditor content='' form={form} />
              <Text size='sm' c='red'>
                {form.errors.description}
              </Text>
            </Box>
            <div>
              <Group align='end' grow>
                <NumberInput
                  {...form.getInputProps('salary')}
                  label='Salary'
                  placeholder='Enter Amount'
                  withAsterisk
                  min={0}
                />
                <div>
                  <Button
                    styles={{
                      root: {
                        display: !withRange ? 'inline-block' : 'none',
                        visibility: !withRange ? 'visible' : 'hidden'
                      }
                    }}
                    onClick={() => {
                      form.setFieldValue('withMaxSalary', true);
                      setWithRange(true);
                    }}
                    variant='transparent'
                    leftSection={<IconPlus />}
                  >
                    Add Range
                  </Button>
                  <div
                    style={{
                      display: form.values.withMaxSalary ? 'flex' : 'none',
                      visibility: form.values.withMaxSalary ? 'visible' : 'hidden',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <NumberInput
                      w='100%'
                      aria-label='Enter Max Amount'
                      placeholder='Enter Max Amount'
                      withAsterisk
                      min={form.values.salary}
                      {...form.getInputProps('salaryMax')}
                    />
                    <ActionIcon
                      variant='subtle'
                      color='blue.7'
                      aria-label='without range'
                      onClick={() => {
                        form.setFieldValue('withMaxSalary', false);
                        setWithRange(false);
                      }}
                    >
                      <IconX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                  </div>
                </div>
              </Group>
              <Group align='end' grow mt='lg'>
                <Select
                  aria-label='currency'
                  data={currencies}
                  defaultChecked
                  {...form.getInputProps('salaryCurrency')}
                />
                <Select
                  aria-label='salary time frame'
                  data={salaryTimeFrame}
                  defaultChecked
                  {...form.getInputProps('salaryTime')}
                />
              </Group>
              <Checkbox
                mt='md'
                label='Show salary to job seekers Recommended!'
                {...form.getInputProps('showSalary')}
              />
            </div>
            <Textarea
              label='Additional Application Instructions'
              autosize
              minRows={2}
              {...form.getInputProps('howToApply')}
            />
            <Textarea
              label='Why Work at This Company?'
              maxLength={140}
              minRows={5}
              description='Give a one-line sales pitch for working at this company (140 characters max.). Note: editing this field will affect all jobs at this hiring company.'
              {...form.getInputProps('motivation')}
            />
            <Textarea
              label='Hiring Company Description'
              maxLength={140}
              minRows={5}
              description='Note: editing this description will affect all jobs at this hiring company.'
              {...form.getInputProps('aboutCompany')}
            />
          </Stack>
        </form>
      </BaseModal>
    </>
  );
}
