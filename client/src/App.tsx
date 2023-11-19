import { Container, Grid, Skeleton, Title } from '@mantine/core';
import { useGetHelloWorld } from './api/hello-world';

const child = <Skeleton height={140} radius="md" animate />;

function App() {
  const {data, isLoading} = useGetHelloWorld()
  return (
    <Container my="md">
      <Title order={1} >{isLoading ? "Loading..." : data}</Title>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}

export default App;