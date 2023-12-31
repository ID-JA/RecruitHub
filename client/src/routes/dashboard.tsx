import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';
import { useAuthStore } from '../store';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { Grid, Paper, Text, Title } from '@mantine/core';
import { Container } from '@mantine/core';


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
    <Container my="md">
      <Text fw='bold' mb='lg'> 
          {' '} Welcome {user?.name}
      </Text>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 4 }}>
        <Paper withBorder p='lg'>
            <Text c='orange' fz={50} fw='bold'>
              {!query.isFetching ? query.data?.total_pending_jobs : 0}
            </Text>
            <Text c='orange' fz='lg'>
              Pending Jobs
            </Text>
        </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
        <Paper withBorder p='lg'>
          <Text c='red' fz={50} fw='bold'>
              {!query.isFetching ? query.data?.total_closed_jobs : 0}
            </Text>
          <Text c='red' fz='lg'>
            Closed Jobs
          </Text>
        </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 4 }}>
          <Paper withBorder p='lg'>
            <Text c='green' fz={50} fw='bold'>
                  {!query.isFetching ? query.data?.total_active_jobs : 0}
            </Text>
            <Text c='green' fz='lg'>
              Active Jobs
            </Text>
          </Paper> 
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
             <Paper withBorder p='lg'>
              <Title size='h3'>Total Applicants</Title>
             <Text c='gray' fz={50} fw='bold'>
               {!query.isFetching ? query.data?.total_applications_jobs : 0}
             </Text>
             <Text c='gray' fz='lg'>
               Candidate
              </Text>
         </Paper>  
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 12 }}>
              <Paper withBorder p='lg'>
             <Title size='h3'>Total Interviews</Title>

               <Text c='gray' fz={50} fw='bold'>
             {!query.isFetching ? query.data?.total_interviews : 0}
               </Text>
           <Text c='gray' fz='lg'>
                 Interviews
               </Text>
           </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export const dashboardRoute = new Route({
  path: '/',
  getParentRoute: () => portalLayoutRoute,
  component: Dashboard
});
