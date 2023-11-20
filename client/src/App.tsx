import { Box, Button, Container, Flex, Grid, Group, Skeleton, Text, Title } from '@mantine/core';
import { useGetHelloWorld } from './api/hello-world';

import { Outlet, Link } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

// Create a root route

const child = <Skeleton height={140} radius='md' animate />;

function App() {
  const { data, isLoading } = useGetHelloWorld();
  return (
    <>
      <Box p='sm'>
        <Group align='center' justify='space-between'>
          <Flex gap='md'>
            <Link to='/'>
              <Text>Home</Text>
            </Link>
            <Link to='/about'>
              <Text>About</Text>
            </Link>
          </Flex>
          <Flex gap='md'>
            <Link to='/'>
              <Button>Post a job</Button>
            </Link>
            <Link to='/about'>
              <Button variant='outline'>Sign in</Button>
            </Link>
          </Flex>
        </Group>
      </Box>
      <Container my='md'>
        <Outlet />
        <Title order={1}>{isLoading ? 'Loading...' : data}</Title>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
          <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
          <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
          <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
          <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
        </Grid>
        <TanStackRouterDevtools />
      </Container>
    </>
  );
}

export function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
}

export function About() {
  return <div>Hello from About!</div>;
}

// Create the route tree using your routes

// Create the router using your route tree

// Register your router for maximum type safety

export default App;
