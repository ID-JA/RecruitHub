import { Container, Group, Burger, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './MainHeader.module.css';
import { Link } from '@tanstack/react-router';
import { RecruitHubLogo } from '../logo/logo';

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const items = (
    [
      ['/jobs', 'Jobs'],
      ['/login', 'Companies'],
      ['/login', 'About us']
    ] as const
  ).map(([to, label]) => {
    return (
      <div key={to}>
        <Link
          to={to}
          className={classes.link}
          preload='intent'
          activeProps={{
            style: {
              fontWeight: 'bold'
            }
          }}
        >
          {label}
        </Link>
      </div>
    );
  });

  return (
    <header className={classes.header}>
      <Container size='xl' className={classes.inner}>
        <RecruitHubLogo />
        <Group gap={5} visibleFrom='xs'>
          {items}
        </Group>
        <Group>
          {/* TODO: if user is logged in we render profile component instead of auth buttons */}
          <Link to='/login'>
            <Button variant='outline'>Sign in</Button>
          </Link>
          <Link to='/signup'>
            <Button>Sign up</Button>
          </Link>
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='xs' size='sm' />
      </Container>
    </header>
  );
}
