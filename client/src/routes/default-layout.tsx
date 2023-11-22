import { Outlet, RootRoute } from '@tanstack/react-router';
import { HeaderSimple } from '../components/shared/header/MainHeader';
import { Container } from '@mantine/core';

const Root = () => {
  return (
    <div>
      <HeaderSimple />
      <Container size='xl'>
        <strong>Note : Default Layout for home, auth, jobs, companies and about us pages</strong>
        <Outlet />
      </Container>
    </div>
  );
};

export const defaultRoute = new RootRoute({
  component: Root
});
