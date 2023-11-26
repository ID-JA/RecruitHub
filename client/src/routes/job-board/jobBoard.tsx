import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, Group, Burger, Box, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TextInput, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import classes from './DoubleHeader.module.css';
import { useState } from 'react';

export function JobBoard() {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const mainLinks = [
    { link: '#', label: 'For You' },
    { link: '#', label: 'Applied Jobs' },
    { link: '#', label: 'Saved Jobs' }
  ];

  const mainItems = mainLinks.map((item, index) => (
    <Anchor<'a'>
      href={item.link}
      key={item.label}
      className={`${classes.mainLink} ${index === active ? classes.active : ''}`}
      data-active={index === active || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(index);
      }}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Container className={classes.jobBoardContainer}>
      {/* Add the InputWithButton component at the top center */}

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

      {/* DoubleHeader (Navbar) */}
      <header className={classes.header}>
        <Container className={classes.inner}>
          <Box className={classes.links} visibleFrom='sm'>
            <Group gap={0} justify='center' className={classes.mainLinks}>
              {mainItems}
            </Group>
          </Box>
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

// ForYouContent.tsx
/*export function ForYouContent() {
  return <div>Content for For You tab</div>;
}

// AppliedJobsContent.tsx
export function AppliedJobsContent() {
  return <div>Content for Applied Jobs tab</div>;
}

// SavedJobsContent.tsx
export function SavedJobsContent() {
  return <div>Content for Saved Jobs tab</div>;
}*/

export const jobBoardRoute = new Route({
  path: 'jobBoard',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
