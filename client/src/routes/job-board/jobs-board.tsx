import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Box, Container, Tabs } from '@mantine/core';
import { TextInput, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
//import { jobData } from './components/jobData';
//import { JobOfferPreviewCard } from './components/preview-card';
//import { JobOfferCard } from './components/offer-card';
import ForYou from './components/ForYou';

const stickHederHeight = 64;

export function JobBoard() {
  /* const handleJobCardClick = () => {
    console.log('preview');
  };*/
  /*  const jobList = jobData.map((job) => (
    <JobOfferCard key={job.id} {...job} onClick={handleJobCardClick} />
  ));*/

  return (
    <Container fluid={true}>
      <Box>
        <TextInput
          radius='xl'
          size='lg'
          placeholder='Find your perfect job'
          rightSectionWidth={90}
          m='auto'
          w='40%'
          leftSection={<IconSearch style={{ width: rem(22), height: rem(22) }} stroke={2} />}
          rightSection={
            <ActionIcon size={28} radius='xl' variant='transparent'>
              <IconArrowRight style={{ width: rem(26), height: rem(26) }} stroke={3} />
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
        <Tabs defaultValue='forYou'>
          <Tabs.List justify='center'>
            <Tabs.Tab value='forYou'>For You</Tabs.Tab>
            <Tabs.Tab value='appliedJobs'>Applied Jobs</Tabs.Tab>
            <Tabs.Tab value='savedJobs'>Saved Jobs</Tabs.Tab>
          </Tabs.List>

          {/* Content for each tab */}
          <Tabs.Panel value='forYou'>
            <ForYou />
          </Tabs.Panel>
        </Tabs>
      </Box>
    </Container>
  );
}

export const jobsBoardRoute = new Route({
  path: 'jobs-board',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
