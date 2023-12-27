import {
  Button,
  Divider,
  Group,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { registerUser } from '../../api/auth-service';
import { notifications } from '@mantine/notifications';

function CompanyDetails({ form }: { form: any }) {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.history.replace('/login');
      notifications.show({
        message: 'Verify your email address to complete registration'
      });
    },
    onError: (error) => {
      notifications.show({
        message: error.response.data.message,
        color: 'red'
      });
    }
  });

  const handleSkip = () => {
    const { companyDetails, firstName, lastName, ...rest } = form.values;
    mutation.mutate({
      role: 'recruiter',
      name: `${firstName} ${lastName}`,
      ...rest
    });
  };

  return (
    <>
      <Title order={4}>Company details</Title>
      <Divider my='md' />
      <form
        onSubmit={form.onSubmit((values: any) => {
          const { companyDetails, firstName, lastName, ...rest } = values;
          mutation.mutate({
            role: 'recruiter',
            name: `${firstName} ${lastName}`,
            ...rest,
            ...companyDetails
          });
        })}
      >
        <Stack>
          <Select
            label='Your current position'
            data={[
              'admin',
              'hr / talent professional',
              'manager / head of department',
              'director / vp',
              'business owner',
              'recruiting/staffing firm'
            ]}
            variant='filled'
            {...form.getInputProps('companyDetails.positionAtCompany', { type: 'select' })}
          />
          <Select
            label='Industry'
            variant='filled'
            data={[
              'Information Technology',
              'Healthcare',
              'Finance',
              'Education',
              'Manufacturing',
              'Retail',
              'Hospitality',
              'Real Estate',
              'Transportation',
              'Energy'
            ]}
            {...form.getInputProps('companyDetails.industry', { type: 'select' })}
          />
          <TextInput
            label='Location'
            {...form.getInputProps('companyDetails.location')}
            variant='filled'
          />
          <TextInput
            label='Website'
            {...form.getInputProps('companyDetails.webstie')}
            variant='filled'
          />
          <TextInput
            type='number'
            label='zip code'
            variant='filled'
            min={0}
            {...form.getInputProps('companyDetails.zip')}
          />
          <Textarea
            variant='filled'
            label='About company'
            {...form.getInputProps('companyDetails.about')}
          />
          <Group justify='space-between'>
            <Group>
              <Button
                variant='subtle'
                onClick={() => {
                  form.reset();
                  router.history.replace('/signup#employer-details');
                }}
                loading={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant='subtle'
                type='button'
                onClick={handleSkip}
                loading={mutation.isPending}
              >
                Skip
              </Button>
            </Group>
            <Button type='submit' loading={mutation.isPending}>
              Submit
            </Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}

export default CompanyDetails;
