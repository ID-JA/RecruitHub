import { Route, useNavigate, useRouter, useRouterState } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  Badge,
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  Grid,
  Group,
  Input,
  Paper,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title
} from '@mantine/core';
import { IconSearch, IconCurrentLocation } from '@tabler/icons-react';
import { JobOfferPreviewCard } from './components/preview-card';
import { JobData, JobOfferCard, OfferCardPlaceholder } from './components/offer-card';
import { useAuthStore } from '../../store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { IconArchiveOff } from '@tabler/icons-react';

const stickHederHeight = 64;

export function JobBoard() {
  const routerState = useRouterState();
  const [selectedItem, setSelectedItem] = useState<JobData | undefined>();
  const [filterOptions, setFilterOptions] = useState({
    location: '',
    title: ''
  });
  const handleJobCardClick = (item: JobData) => {
    setSelectedItem(item);
  };
  const navigate = useNavigate();

  const queryJobs = useQuery({
    queryKey: ['jobs-ads', filterOptions],
    queryFn: async () => {
      const response = await axiosInstance.get('/jobs', {
        params: filterOptions
      });
      return response.data;
    }
  });

  const jobList = queryJobs.data?.map((job: JobData) => (
    <JobOfferCard key={job.id} offer={job} onSelect={handleJobCardClick} />
  ));

  const jobCardSkelton = Array.from({ length: 5 }).map((_, i) => <OfferCardPlaceholder key={i} />);
  const { isLoggedIn } = useAuthStore();

  // dynamic handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Container fluid={true} mb='xl'>
      <Group gap='xs' my='lg' justify='center'>
        <Input
          name='title'
          onChange={handleChange}
          leftSection={<IconSearch size={16} />}
          placeholder='Job title, keyword...'
          rightSectionPointerEvents='all'
          rightSection={<CloseButton aria-label='Clear input' />}
          w='25%'
        />
        <Input
          name='location'
          onChange={handleChange}
          leftSection={<IconCurrentLocation size={16} />}
          placeholder='Your Location'
          rightSectionPointerEvents='all'
          rightSection={<CloseButton aria-label='Clear input' />}
          w='25%'
        />
        <Button
          radius='sm'
          variant='gradient'
          gradient={{ from: 'blue', to: '#8FBBE7', deg: 90 }}
          type='submit'
          size='sm'
        >
          Search
        </Button>
      </Group>

      <Box
        style={{
          position: 'sticky',
          top: '0px',
          height: stickHederHeight,
          zIndex: 50,
          marginTop: '0px'
        }}
        bg='#F8F9FA'
        p='md'
      >
        <Tabs
          defaultValue='latest'
          value={routerState.location.hash}
          onChange={(value) => {
            navigate({
              to: '/jobs-board',
              hash: value!
            });
          }}
        >
          <Tabs.List justify='center'>
            <Tabs.Tab value='latest'>Latest</Tabs.Tab>
            {isLoggedIn && (
              <>
                <Tabs.Tab value='applied'>Applied</Tabs.Tab>
                <Tabs.Tab value='saved'>Saved</Tabs.Tab>
              </>
            )}
          </Tabs.List>
        </Tabs>
      </Box>
      <Container size='xl'>
        {routerState.location.hash === 'latest' && (
          <Grid>
            <Grid.Col
              span={{
                md: 4,
                xs: 12
              }}
            >
              <Stack gap='md'>
                {queryJobs.isFetching ? (
                  jobCardSkelton
                ) : queryJobs.data.length === 0 ? (
                  <div>No offers</div>
                ) : (
                  jobList
                )}
              </Stack>
            </Grid.Col>
            <Grid.Col span={8} visibleFrom='md'>
              <div
                style={{
                  position: 'sticky',
                  top: `${stickHederHeight + 30}px`
                }}
              >
                <JobOfferPreviewCard selectedOffer={selectedItem} />
              </div>
            </Grid.Col>
          </Grid>
        )}
        {routerState.location.hash === 'applied' && <AppliedJobs />}
      </Container>
    </Container>
  );
}

export const jobsBoardRoute = new Route({
  path: 'jobs-board',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});

const AppliedJobs = () => {
  const queryAppliedJob = useQuery({
    queryKey: ['applied-jobs'],
    queryFn: async () => {
      const response = await axiosInstance.get('/candidate/applied-jobs');
      return response.data;
    }
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['cancel-application'],
    mutationFn: async (id) => {
      await axiosInstance.delete(`/candidate/cancel-application/${id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['applied-jobs']
      });

      notifications.show({
        title: 'Success',
        message: 'You canceled your application'
      });
    }
  });

  const applications = queryAppliedJob.data?.applications.map((item) => {
    return (
      <Paper withBorder p='lg' key={item.id}>
        <Group align='center' justify='space-between'>
          <Title size='h4'>{item.job_title}</Title>
          <Badge variant='outline'>{item.status}</Badge>
          <Text>{new Date(item.created_at).toLocaleDateString()}</Text>
          <Button
            disabled={item.status !== 'pending'}
            color='red'
            onClick={() => mutation.mutate(item.id)}
            loading={mutation.isPending}
          >
            Cancel
          </Button>
        </Group>
      </Paper>
    );
  });
  return (
    <Container>
      <Stack>
        {queryAppliedJob.isFetching ? (
          Array.from({ length: 5 }).map((_, i) => (
            <Paper withBorder key={i} p='lg'>
              <Group align='center' justify='space-between'>
                <Skeleton height={10} width='20%' />
                <Skeleton height={10} width='20%' />
                <Skeleton height={10} width='20%' />
                <Skeleton height={10} width='20%' />
              </Group>
            </Paper>
          ))
        ) : queryAppliedJob.data?.applications.length ? (
          applications
        ) : (
          <Flex align='center' justify='center' h='200'>
            <Stack align='center'>
              <IconArchiveOff style={{ margin: 'auto' }} />
              <Title size='h3'>You didn't applied for job</Title>
            </Stack>
          </Flex>
        )}
      </Stack>
    </Container>
  );
};
