import { useState } from 'react';
import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Tabs, Container, Paper, Image, Grid, rem, Flex } from '@mantine/core';
import { EmployerForm } from './EmployerForm';
import { TalentForm } from './TalentForm';

export function SignUp() {
  const [activeTab, setActiveTab] = useState('talent');

  return (
    <Container size='lg' h='100vh'>
      <Flex justify='center' align='center' h='100%'>
        <Grid justify='center' align='center'>
          <Grid.Col span={6} visibleFrom='md'>
            <Image
              src={activeTab === 'talent' ? '/talent.png' : '/recruiter.png'}
              h={400}
              fit='contain'
              alt={`Image for ${activeTab}`}
            />
          </Grid.Col>
          <Grid.Col
            span={{
              md: 6,
              xs: 12
            }}
            style={{ minHeight: rem(120) }}
          >
            <Paper p='xl' withBorder>
              <Tabs
                color='indigo'
                variant='outline'
                defaultValue='talent'
                onChange={(value) => setActiveTab(value || 'talent')}
              >
                <Tabs.List grow>
                  <Tabs.Tab value='talent'>Talent</Tabs.Tab>

                  <Tabs.Tab value='employer'>Employer</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='talent'>
                  <TalentForm />
                </Tabs.Panel>

                <Tabs.Panel value='employer'>
                  <EmployerForm />
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </Grid.Col>
        </Grid>
      </Flex>
    </Container>
  );
}

export const signUpRoute = new Route({
  path: 'signup',
  component: SignUp,
  getParentRoute: () => defaultLayoutRoute
});
