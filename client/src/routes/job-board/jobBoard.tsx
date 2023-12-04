import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, Burger, Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TextInput, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import classes from './DoubleHeader.module.css';

export function JobBoard() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Container className={classes.jobBoardContainer}>
      <TextInput
        radius='xl'
        size='xs'
        placeholder='Find your perfect job'
        rightSectionWidth={50}
        style={{ marginBottom: '0px', width: '50%' }}
        leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        rightSection={
          <ActionIcon size={24} radius='xl' color={theme.primaryColor} variant='filled'>
            <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
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

      <header className={classes.header}>
        <Container className={classes.inner}>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size='sm'
            hiddenFrom='sm'
          />
        </Container>
      </header>
    </Container>
  );
}

export const jobBoardRoute = new Route({
  path: 'jobBoard',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
