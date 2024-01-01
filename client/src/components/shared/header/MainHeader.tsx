import { Container, Group, Burger, Button, Skeleton, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './MainHeader.module.css';
import { Link } from '@tanstack/react-router';
import { RecruitHubLogo } from '../logo/logo';
import { useAuthStore } from '../../../store';
import UserToolbar from '../user-toolbar';

export function MainHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const items = (
    [
      ['/jobs-board', 'Jobs'],
      ['/login', 'Companies'],
      ['/login', 'About us']
    ] as const
  ).map(([to, label], index) => {
    return (
      <div key={index}>
        <Link
          to={to}
          className={classes.link}
          activeProps={{
            style: {
              fontWeight: 'bold'
            }
          }}
          hash={label === 'Jobs' ? 'latest' : ' '}
        >
          {label}
        </Link>
      </div>
    );
  });

  const { isLoggedIn, user, isFetchingUser } = useAuthStore();

  return (
    <header className={classes.header}>
      <Container size='xl' className={classes.inner}>
        <RecruitHubLogo />
        <Group gap={5} visibleFrom='xs'>
          {items}
        </Group>
        <Group>
          {isFetchingUser ? (
            <Flex gap='md'>
              <Skeleton height={38} width={38} />
              <Skeleton height={38} width={38} />
              <Skeleton height={38} width={38} />
            </Flex>
          ) : !isLoggedIn ? (
            <>
              <Link to='/login'>
                <Button variant='outline'>Sign in</Button>
              </Link>
              <Link to='/signup' hash='employer-details'>
                <Button>Sign up</Button>
              </Link>
            </>
          ) : user?.role === 'recruiter' ? (
            <Link to='/portal'>
              <Button>Go to portal</Button>
            </Link>
          ) : (
            <UserToolbar />
          )}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom='xs' size='sm' />
      </Container>
    </header>
  );
}
