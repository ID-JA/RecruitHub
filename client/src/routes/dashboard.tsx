import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';
import { useAuthStore } from '../store';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { Badge, Grid, Group, Paper, Text, Title } from '@mantine/core';

function Dashboard() {
  const { user } = useAuthStore();
  const query = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await axiosInstance.get('/recruiter');
      return response.data;
    }
  });
  return (
    <div>
      <Text fw='bold' mb='lg'>
        {' '}
        Welcome {user?.name}
      </Text>
      <Grid>
        <Grid.Col span={4}>
          <Paper withBorder p='lg'>
            <Title size='h3'>Total job offers</Title>
            <Group justify='space-between'>
              <div>
                <Text c='orange' fz={50} fw='bold'>
                  {!query.isFetching ? query.data?.total_pending_jobs : 0}
                </Text>
                <Text c='orange' fz='lg'>
                  Pending
                </Text>
              </div>
              <div>
                <Text c='red' fz={50} fw='bold'>
                  {!query.isFetching ? query.data?.total_closed_jobs : 0}
                </Text>
                <Text c='red' fz='lg'>
                  Closed
                </Text>
              </div>
              <div>
                <Text c='green' fz={50} fw='bold'>
                  {!query.isFetching ? query.data?.total_closed_jobs : 0}
                </Text>
                <Text c='green' fz='lg'>
                  Active
                </Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper withBorder p='lg'>
            <Title size='h3'>Total Applicants</Title>

            <div>
              <Text c='gray' fz={50} fw='bold'>
                {!query.isFetching ? query.data?.total_applications_jobs : 0}
              </Text>
              <Text c='gray' fz='lg'>
                Candidate
              </Text>
            </div>
          </Paper>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper withBorder p='lg'>
            <Title size='h3'>Total Interviews</Title>

            <div>
              <Text c='gray' fz={50} fw='bold'>
                {!query.isFetching ? query.data?.total_interviews : 0}
              </Text>
              <Text c='gray' fz='lg'>
                Interviews
              </Text>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export const dashboardRoute = new Route({
  path: '/',
  getParentRoute: () => portalLayoutRoute,
  component: Dashboard
});
