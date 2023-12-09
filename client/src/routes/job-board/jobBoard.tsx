import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, Tabs } from '@mantine/core';
import { TextInput, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import classes from './DoubleHeader.module.css';

export function JobBoard() {
  return (
    <Container className={classes.jobBoardContainer}>
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

      {/* Add the Tabs component here */}
      <Tabs defaultValue='first'>
        <Tabs.List justify='center'>
          <Tabs.Tab value='first'>First tab</Tabs.Tab>
          <Tabs.Tab value='second'>Second tab</Tabs.Tab>
          <Tabs.Tab value='third'>Third tab</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Container>
  );
}

export const jobBoardRoute = new Route({
  path: 'jobBoard',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
