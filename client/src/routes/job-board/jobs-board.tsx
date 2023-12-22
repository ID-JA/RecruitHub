import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Box, Container, Grid, Stack, Tabs } from '@mantine/core';
import { TextInput, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { jobData } from '../../components/jobs-board/jobData';
import { JobOfferPreviewCard } from '../../components/jobs-board/preview-card';
import { JobOfferCard } from '../../components/jobs-board/offer-card';

const stickHederHeight = 64;

export function JobBoard() {
  const handleJobCardClick = () => {
    console.log('preview');
  };
  const jobList = jobData.map((job) => (
    <JobOfferCard key={job.id} {...job} onClick={handleJobCardClick} />
  ));

  return (
    <Container fluid={true}>
      <Box>
        <TextInput
          radius='xl'
          size='lg'
          placeholder='Find your perfect job'
          rightSectionWidth={90}
          m='auto'
          w='50%'
          leftSection={<IconSearch style={{ width: rem(22), height: rem(22) }} stroke={1.5} />}
          rightSection={
            <ActionIcon size={28} radius='xl' variant='filled'>
              <IconArrowRight style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
            </ActionIcon>
          }
        />
      </Box>
      <Box
        style={{
          position: 'sticky',
          top: '0px',
          height: stickHederHeight,
          zIndex: 50
        }}
        bg='white'
        p='xl'
        mb='xl'
      >
        <Tabs defaultValue='first'>
          <Tabs.List justify='center'>
            <Tabs.Tab value='first'>Latest</Tabs.Tab>
            <Tabs.Tab value='second' disabled>
              For you
            </Tabs.Tab>
            <Tabs.Tab value='third' disabled>
              Applied
            </Tabs.Tab>
            <Tabs.Tab value='third' disabled>
              Saved
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </Box>
      <Grid>
        <Grid.Col
          span={{
            md: 6,
            xs: 12
          }}
        >
          <Stack gap='md'>{jobList}</Stack>
        </Grid.Col>
        <Grid.Col span={6} visibleFrom='md'>
          <div
            style={{
              position: 'sticky',
              top: `${stickHederHeight + 30}px`
            }}
          >
            {/* TODO: if offer is selected render the JobOfferPreviewCard otherwise render the JobOfferPreviewPlaceHolder */}
            <JobOfferPreviewCard />
          </div>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export const jobsBoardRoute = new Route({
  path: 'jobs-board',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
