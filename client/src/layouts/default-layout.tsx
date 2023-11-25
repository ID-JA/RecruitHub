import { Outlet, Route } from '@tanstack/react-router';
import { Container } from '@mantine/core';
import { MainHeader } from '../components/shared';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { rootRoute } from '../routes/Router';

const DefaultLayout = () => {
  return (
    <>
      <MainHeader />
      <Container size='xl'>
        <Outlet />
        <TanStackRouterDevtools />
      </Container>
    </>
  );
};

export const defaultLayoutRoute = new Route({
  path: '/',
  getParentRoute: () => rootRoute,
  component: DefaultLayout
});
