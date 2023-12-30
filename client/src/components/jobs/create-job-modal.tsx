import { useCallback, useMemo, useState } from 'react';
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
  title: z.string().min(1),
  company_id: z.string().min(1),
  location: z.string().min(1),
  employmentType: z.string().min(1),
  category: z.array(z.string().min(1)),
  description: z.string().min(1),
  salary: z.number(),
  withMaxSalary: z.boolean().default(false).optional(),
  salaryMax: z.number().optional(),
  salaryCurrency: z.string().min(1),
  salaryTime: z.string().min(1),
  showSalary: z.boolean().optional(),
  howToApply: z.string().min(1),
  motivation: z.string().min(1),
  aboutCompany: z.string().min(1),
  requirements: z.array(z.string().min(1))
});

export type TJobData = z.infer<typeof schema> & {
  status: string;
  created_at?: Date;
  id: number | null;
};

const formDefaultValues = {
  title: '',
  company_id: '',
  location: '',
  employmentType: '',
  category: [],
  description: '',
  salary: 0,
  withMaxSalary: false,
  salaryMax: 0,
  salaryCurrency: '',
  salaryTime: '',
  showSalary: false,
  howToApply: '',
  motivation: '',
  aboutCompany: '',
  requirements: [],
  status: 'pending',
  id: null
};

const updateJobOfferRequest = async (data: TJobData) => {
  return (await axiosInstance.put(`/jobs/${data.id}`, data)).data;
};

const createJobOfferRequest = async (data: TJobData) => {
  return (await axiosInstance.post('/jobs', data)).data;
};
export default function AddEditJobOffer({
  jobOffer,
  close,
  opened
}: {
  jobOffer?: TJobData;
  close: () => void;
  opened: boolean;
}) {
  const [withRange, setWithRange] = useState(false);
  const [createOtherJob, setCreateOtherJob] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { companies } = useAuthStore();

  const { onInputChange, suggestions } = useGeoLocation();
  const mutation = useMutation({
    mutationFn: jobOffer?.id ? updateJobOfferRequest : createJobOfferRequest,
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: `Job ${jobOffer?.id ? 'updated' : 'created'} successfully`,
        color: 'green'
      });
      queryClient.invalidateQueries({
        queryKey: ['my-jobs']
      });
      if (!createOtherJob) {
        close();
      }
      form.reset();
    },
    onError: (error) => {
      console.log('🚀 ~ file: create-job-modal.tsx:85 ~ CreateJobModal ~ error:', error);
    }
  });
  const form = useForm<TJobData>({
    validate: zodResolver(schema),
    initialValues: jobOffer?.id
      ? {
          ...jobOffer,
          company_id: jobOffer?.company_id.toString(),
          salary: Number(jobOffer.salary),
          showSalary: Boolean(jobOffer.showSalary)
        }
      : formDefaultValues,
    initialErrors: {
      salary: null
    }
  });

  const handleSubmit =
    (status: 'pending' | 'active') => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      form.onSubmit((values) => {
        mutation.mutate({
          ...values,
          status
        });
      })();
    };

  const Actions = (
    <Flex justify='space-between' align='center' direction='row' px='md' py='lg'>
      {!jobOffer?.id ? (
        <Checkbox
          key='create-more-jobs-check'
          label='Create another job'
          checked={createOtherJob}
          onChange={(event) => setCreateOtherJob(event.currentTarget.checked)}
        />
      ) : (
        <div />
      )}
      <Flex justify='flex-end' gap='md'>
        <Button onClick={close} variant='transparent' loading={mutation.isPending}>
          Cancel
        </Button>
        {!jobOffer?.id && (
          <Button
            key='save-as-draft-action'
            variant='outline'
            type='submit'
            onClick={handleSubmit('pending')}
            loading={mutation.isPending}
          >
            Draft
          </Button>
        )}

        <Button onClick={handleSubmit('active')} loading={mutation.isPending} type='submit'>
          {jobOffer?.id ? 'Save Changes' : 'Publish'}
        </Button>
      </Flex>
    </Flex>
  );
  return (
    <BaseModal open={open} close={close} opened={opened} title='Create Job' actions={Actions}>
      <form>
        <Text c='gray' size='sm' px='md'>
          Required fields are marked with an asterisk{' '}
          <span style={{ color: 'var(--mantine-color-red-6)' }}>*</span>
        </Text>
        <Stack mt='lg' px='xl'>
          <Select data={companies} label='select a company' {...form.getInputProps('company_id')} />
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
  );
}

export const useAddEditJobOffer = (jobOffer?: TJobData) => {
  const [opened, { close, open }] = useDisclosure(false);

  const AddEditJobOfferModalCallback = useCallback(() => {
    return opened ? <AddEditJobOffer opened={opened} close={close} jobOffer={jobOffer} /> : null;
  }, [jobOffer, open, close, opened]);

  return useMemo(
    () => ({
      openAddEditJobOfferModal: open,
      closeAddEditJobOfferModal: close,
      AddEditJobOfferModal: AddEditJobOfferModalCallback
    }),
    [close, AddEditJobOfferModalCallback, open]
  );
};
