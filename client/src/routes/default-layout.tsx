import { Outlet, RootRoute } from '@tanstack/react-router';
import { MainHeader } from '../components/shared';
import { Container } from '@mantine/core';

const Root = () => {
  return (
    <div>
      <MainHeader />
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
