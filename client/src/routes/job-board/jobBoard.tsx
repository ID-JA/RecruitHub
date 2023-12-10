import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, Tabs } from '@mantine/core';
import { TextInput, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import classes from './DoubleHeader.module.css';
import ForYou from './ForYou';
import SavedJobs from './SavedJobs';
import AppliedJobs from './AppliedJobs';

export function JobBoard() {
  return (
    <Container fluid={true} className={classes.jobBoardContainer}>
      <TextInput
        radius='xl'
        size='s'
        placeholder='Find your perfect job'
        rightSectionWidth={90}
        style={{ marginBottom: '10px', width: '500px' }}
        leftSection={<IconSearch style={{ width: rem(22), height: rem(22) }} stroke={1.5} />}
        rightSection={
          <ActionIcon size={28} radius='xl' color='#53A8E6' variant='filled'>
            <IconArrowRight style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
          </ActionIcon>
        }
      />

      <Tabs defaultValue='foryou' style={{ width: '95%', marginBottom: '0px' }}>
        <Tabs.List justify='center' style={{ marginBottom: '10px' }}>
          <Tabs.Tab value='foryou' style={{ fontWeight: 700 }}>
            For You
          </Tabs.Tab>
          <Tabs.Tab value='appliedjobs' style={{ fontWeight: 700 }}>
            Applied Jobs
          </Tabs.Tab>
          <Tabs.Tab value='savedjobs' style={{ fontWeight: 700 }}>
            Saved Jobs
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='foryou' style={{ width: '100%', marginTop: '8px' }}>
          <ForYou />
        </Tabs.Panel>

        <Tabs.Panel value='appliedjobs'>
          <AppliedJobs />
        </Tabs.Panel>

        <Tabs.Panel value='savedjobs'>
          <SavedJobs />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export const jobBoardRoute = new Route({
  path: 'jobBoard',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
