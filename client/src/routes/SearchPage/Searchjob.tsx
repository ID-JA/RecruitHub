import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Container, Grid, Title, Text, TextInput, ActionIcon, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { IconArrowRight } from '@tabler/icons-react';
import './Searchjob.css';
import image from './images/searchjob.jpg';

export const Searchjob = () => {
  return (
    <Container fluid={true}>
      <section className='heroS' id='heroS'>
        <Container style={{ padding: '30px 40px 0px 40px' }}>
          <Grid>
            <Grid.Col span={6}>
              <div style={{ marginBottom: '40px', maxWidth: '800px' }}>
                <Title className='heroS-title'>
                  Open Jobs.<br></br> People Hiring.
                </Title>

                <Text
                  style={{
                    lineHeight: '1.8',
                    marginBottom: '10px ',
                    color: 'var(--cool-gray)',
                    marginLeft: '5px '
                  }}
                >
                  Find your job..
                </Text>
                <TextInput
                  radius='xl'
                  size='md'
                  placeholder='Job title, keywords, or location'
                  rightSectionWidth={90}
                  leftSection={
                    <IconSearch style={{ width: rem(22), height: rem(22) }} stroke={2} />
                  }
                  rightSection={
                    <ActionIcon size={28} radius='xl' variant='filled'>
                      <IconArrowRight style={{ width: rem(22), height: rem(22) }} stroke={2} />
                    </ActionIcon>
                  }
                  style={{ width: '360px' }}
                />
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div>
                <figure className='img'>
                  <img src={image} alt='Image' />
                </figure>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </section>
    </Container>
  );
};

export const SearchjobRoute = new Route({
  path: 'search-job',
  component: Searchjob,
  getParentRoute: () => defaultLayoutRoute
});
