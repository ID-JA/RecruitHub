import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Paper, Container, Grid, rem, Tabs } from '@mantine/core';
import { SettingsForm } from './settingsForm';
import { DetailsForm } from './detailsForm';
import { ProfessionalForm } from './professionalForm';
import { DescriptionGrid } from './description';

function Profile() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '56px',
          left: '0px',
          width: '100%', // Full width
          height: '200px', // Adjust the height as needed
          backgroundColor: '#3366FF', // Set your desired color
          zIndex: -1 // Behind other elements
        }}
      ></div>
      <Container size='xl' style={{ marginTop: '60px' }}>
        {/* Background div */}

        <Grid justify='center' align='stretch'>
          <Grid.Col span={3} style={{ minHeight: rem(80) }}>
            <Paper withBorder shadow='md'>
              <DescriptionGrid />
            </Paper>
          </Grid.Col>
          <Grid.Col span={8} style={{ minHeight: rem(120) }}>
            <Paper p='xl' withBorder shadow='md'>
              <Tabs radius='xs' defaultValue='Details'>
                <Tabs.List grow>
                  <Tabs.Tab value='Details'>Account details</Tabs.Tab>
                  <Tabs.Tab value='Professional'>Professional experience</Tabs.Tab>
                  <Tabs.Tab value='settings'>Account settings</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value='Details'>
                  <DetailsForm />
                </Tabs.Panel>

                <Tabs.Panel value='Professional'>
                  <ProfessionalForm />
                </Tabs.Panel>

                <Tabs.Panel value='settings'>
                  <SettingsForm />
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}

export const profileRoute = new Route({
  component: Profile,
  path: 'profile',
  getParentRoute: () => defaultLayoutRoute
});
