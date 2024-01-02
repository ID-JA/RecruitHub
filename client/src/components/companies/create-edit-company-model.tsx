import {
  Box,
  Button,
  Flex,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import BaseModal from '../shared/modal/base-modal';
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { useGeoLocation } from '../../hook/use-geolocation';
import { notifications } from '@mantine/notifications';

const companySchema = z.object({
  title: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  founded_at: z.number(),
  type: z.string().min(1),
  website: z.string().min(1).url(),
  contact_email: z.string().min(1).email(),
  contact_phone: z.string().min(1),
  logo: z.string().optional(),
  revenue: z.number().default(0),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional()
});

type TCompanyData = z.infer<typeof companySchema>;

function CreateEditCompanyModel() {
  const [opened, { open, close }] = useDisclosure();
  const queryClient = useQueryClient();
  const { onInputChange, suggestions } = useGeoLocation();

  const form = useForm<TCompanyData>({
    validate: zodResolver(companySchema),
    initialValues: {
      title: '',
      location: '',
      description: '',
      founded_at: 0,
      type: '',
      website: '',
      contact_email: '',
      contact_phone: '',
      logo: '',
      revenue: 0,
      facebook: '',
      instagram: '',
      linkedin: ''
    }
  });
  const mutation = useMutation({
    mutationFn: async (values: TCompanyData) => {
      const response = await axiosInstance.post('/company/create', values);
      return response.data;
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        color: 'green',
        message: 'Company has been created successfully'
      });
      queryClient.invalidateQueries({ queryKey: ['user-companies'] });
      close();
    },
    onError: () => {
      notifications.show({
        title: 'Error',
        color: 'red',
        message: 'Something went wrong while creating new company'
      });
    }
  });

  const handleSubmit = () => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    form.onSubmit((values) => {
      mutation.mutate(values);
    })();
  };
  const Actions = (
    <Flex justify='space-between' align='center' direction='row' px='md' py='lg'>
      <Button variant='outline' onClick={close}>
        Cancel
      </Button>
      <Button
        type='submit'
        onClick={form.onSubmit((values) => {
          mutation.mutate(values);
        })}
        loading={mutation.isPending}
      >
        Create
      </Button>
    </Flex>
  );
  return (
    <>
      <BaseModal opened={opened} actions={Actions} close={close} title='Create a company'>
        <form>
          <Stack mt='lg' px='xl'>
            <TextInput
              label='Title'
              placeholder='Enter company name'
              {...form.getInputProps('title')}
            />
            <Select
              searchable
              withAsterisk
              label='Job Location'
              placeholder='e.g., San Francisco, CA'
              onSearchChange={onInputChange}
              data={suggestions.map((suggestion) => ({
                value: suggestion.displayName,
                label: suggestion.displayName
              }))}
              {...form.getInputProps('location')}
            />

            <Textarea
              label='Description'
              placeholder='Enter company description'
              {...form.getInputProps('description')}
            />
            <NumberInput
              label='Founded At'
              placeholder='Enter founding year'
              {...form.getInputProps('founded_at')}
            />
            <Select
              label='Type'
              placeholder='Select company type'
              data={['Technology', 'Healthcare', 'Finance', 'Education']}
              {...form.getInputProps('type')}
            />
            <TextInput
              label='Website'
              placeholder='Enter company website'
              {...form.getInputProps('website')}
            />
            <TextInput
              label='Contact Email'
              placeholder='Enter contact email'
              {...form.getInputProps('contact_email')}
            />
            <TextInput
              label='Contact Phone'
              placeholder='Enter contact phone'
              {...form.getInputProps('contact_phone')}
            />
            <TextInput
              label='Logo'
              placeholder='Enter path to logo'
              {...form.getInputProps('logo')}
            />
            <NumberInput
              label='Revenue'
              placeholder='Enter company revenue'
              step={2}
              {...form.getInputProps('revenue')}
            />
            <Box>
              <Text mb='xs' size='sm' fw='500'>
                Social Media
              </Text>
              <Stack>
                <TextInput
                  leftSection={<IconBrandFacebook />}
                  placeholder='Enter Facebook link'
                  {...form.getInputProps('facebook')}
                />
                <TextInput
                  leftSection={<IconBrandInstagram />}
                  placeholder='Enter Instagram link'
                  {...form.getInputProps('instagram')}
                />
                <TextInput
                  leftSection={<IconBrandLinkedin />}
                  placeholder='Enter LinkedIn link'
                  {...form.getInputProps('linkedin')}
                />
              </Stack>
            </Box>
          </Stack>
        </form>
      </BaseModal>
      <Button onClick={open}>Create Company</Button>
    </>
  );
}

export default CreateEditCompanyModel;
