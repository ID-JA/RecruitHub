import { Link, Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, Divider, Group, Input } from '@mantine/core';

const JobBoard = () => {
  return (
    <Container
      size='xl'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        paddingTop: '50px'
      }}
    >
      {/* Search Input */}
      <Group style={{ width: '70%', maxWidth: '400px' }}>
        <Input
          placeholder='Find your perfect job'
          style={{ borderRadius: '40px', flex: 1, backgroundColor: '#F4F4F4' }}
        />
      </Group>

      {/* Horizontal Navigation Bar */}
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <Link to='/jobBoard' style={{ margin: '0 10px', textDecoration: 'none', color: 'black' }}>
          For You
        </Link>
        <Link to='/jobBoard' style={{ margin: '0 10px', textDecoration: 'none', color: 'black' }}>
          Applied Jobs
        </Link>
        <Link to='/jobBoard' style={{ margin: '0 10px', textDecoration: 'none', color: 'black' }}>
          Saved Jobs
        </Link>
      </div>

      {/* Divider */}
      <Divider
        style={{ width: '100%', backgroundColor: '#E9E9E9', height: '1.5px', margin: '20px 0' }}
      />

      {/* Other components related to jobs go here */}
    </Container>
  );
};

export const jobBoardRoute = new Route({
  path: 'jobBoard',
  component: JobBoard,
  getParentRoute: () => defaultLayoutRoute
});
