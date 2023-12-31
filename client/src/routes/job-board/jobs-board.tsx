import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import {
  Box,
  Button,
  CloseButton,
  Combobox,
  Container,
  Grid,
  Group,
  Input,
  InputBase,
  Stack,
  Tabs
} from '@mantine/core';
import { TextInput, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight, IconCurrentLocation } from '@tabler/icons-react';
import { jobData } from './components/jobData';
import { JobOfferPreviewCard } from './components/preview-card';
import { JobData, JobOfferCard, OfferCardPlaceholder } from './components/offer-card';
import { useAuthStore } from '../../store';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { useState } from 'react';

const stickHederHeight = 64;

export function JobBoard() {
  const [selectedItem, setSelectedItem] = useState<JobData | undefined>();
  const [filterOptions, setFilterOptions] = useState({
    location: '',
    title: ''
  });
  const handleJobCardClick = (item: JobData) => {
    setSelectedItem(item);
  };

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
  const { isLoggedIn, isFetchingUser } = useAuthStore();

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
        <Tabs defaultValue='latest'>
          <Tabs.List justify='center'>
            <Tabs.Tab value='latest'>Latest</Tabs.Tab>
            {isLoggedIn && (
              <>
                <Tabs.Tab value='for-you'>For you</Tabs.Tab>
                <Tabs.Tab value='applied'>Applied</Tabs.Tab>
                <Tabs.Tab value='saved'>Saved</Tabs.Tab>
              </>
            )}
          </Tabs.List>
        </Tabs>
      </Box>
      <Container size='xl'>
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
      </Container>
    </Container>
  );
}

export const jobsBoardRoute = new Route({
  path: 'jobs-board',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
