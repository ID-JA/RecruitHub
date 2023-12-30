import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Box, Button, CloseButton, Container, Input, Tabs } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import ForYou from './components/ForYou';
import AppliedJobs from './components/AppliedJobs';
import SavedJobs from './components/SavedJobs';
import { useState } from 'react';
import { IconCurrentLocation } from '@tabler/icons-react';

const stickHederHeight = 64;

export function JobBoard() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

  return (
    <Container fluid={true}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Input
          leftSection={<IconSearch size={16} />}
          placeholder='Job title, keyword...'
          value={value1}
          onChange={(event) => setValue1(event.currentTarget.value)}
          rightSectionPointerEvents='all'
          mt='md'
          rightSection={
            <CloseButton
              aria-label='Clear input'
              onClick={() => setValue1('')}
              style={{ display: value1 ? undefined : 'none' }}
            />
          }
          style={{ width: '300px', marginRight: '5px' }}
        />
        <Input
          leftSection={<IconCurrentLocation size={16} />}
          placeholder='Your Location'
          value={value2}
          onChange={(event) => setValue2(event.currentTarget.value)}
          rightSectionPointerEvents='all'
          mt='md'
          rightSection={
            <CloseButton
              aria-label='Clear input'
              onClick={() => setValue2('')}
              style={{ display: value2 ? undefined : 'none' }}
            />
          }
          style={{ width: '300px', marginRight: '5px' }}
        />
        <Button
          radius='sm'
          variant='gradient'
          gradient={{ from: 'blue', to: '#8FBBE7', deg: 90 }}
          type='submit'
          size='sm'
          style={{ width: '90px', marginTop: '15px' }}
        >
          Search
        </Button>
      </div>

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
          <Tabs.Panel value='appliedJobs'>
            <AppliedJobs />
          </Tabs.Panel>
          <Tabs.Panel value='savedJobs'>
            <SavedJobs />
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
