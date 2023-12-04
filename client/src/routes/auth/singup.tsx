import { useState } from 'react';
import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import { Tabs, Container, Paper, Image, Grid, rem } from '@mantine/core';
//for talent and employer forms
import { EmployerForm } from './EmployerForm';
import { TalentForm } from './TalentForm';
import talentImage from '../../assets/talent.png';
import employerImage from '../../assets/recruiter.jpg';

export function SignUp() {
  const [activeTab, setActiveTab] = useState('Talent');

  const handleTabChange = (value: string | null) => {
    // Update the active tab when a tab is clicked
    if (value !== null) {
      // Update the active tab when a tab is clicked
      setActiveTab(value);
    }
  };

  // Define different images for each tab

  const tabImages = {
    Talent: talentImage,
    Employer: employerImage
  };
  //styling tabs

  return (
    <Container size='lg'>
      <div>
        {/* <Link to='/reset-password' >go to reset  Password page</Link> */}
        <Grid justify='center' align='center'>
          <Grid.Col span={6} style={{ minHeight: rem(80) }}>
            <Image
              p='xl'
              src={tabImages[activeTab as keyof typeof tabImages]}
              alt={`Image for ${activeTab}`}
              radius='lg'
            />
          </Grid.Col>
          <Grid.Col span={6} style={{ minHeight: rem(120) }}>
            <Paper
              radius=''
              p='xl'
              withBorder
              style={{
                backgroundColor: '#F5F7F8'
              }}
            >
              <Tabs
                color='indigo'
                variant='outline'
                defaultValue='Talent'
                onChange={handleTabChange}
              >
                <Tabs.List grow>
                  <Tabs.Tab value='Talent'>Talent</Tabs.Tab>

                  <Tabs.Tab value='Employer'>Employer</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value='Talent'>
                  <TalentForm />
                </Tabs.Panel>

                <Tabs.Panel value='Employer'>
                  <EmployerForm />
                </Tabs.Panel>
              </Tabs>
            </Paper>
          </Grid.Col>
        </Grid>
      </div>
    </Container>
  );
}

export const signUpRoute = new Route({
  path: 'signup',
  component: SignUp,
  getParentRoute: () => defaultLayoutRoute
});
