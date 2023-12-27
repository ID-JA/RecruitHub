import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import './Home.css';

import {
  Container,
  Title,
  Text,
  Button,
  Grid,
  TextInput,
  ActionIcon,
  rem,
  Paper,
  Box
} from '@mantine/core';

import heroBannerImage from './assets/images/banner.png';
import Hiring from './assets/images/hiringSection.png';
import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandReactNative,
  IconBuilding,
  IconCalculator,
  IconDatabase,
  IconDeviceLaptop,
  IconDeviceMobile,
  IconListSearch,
  IconMan,
  IconMapSearch,
  IconReport,
  IconReportMoney,
  IconSearch,
  IconUserSearch
} from '@tabler/icons-react';
export const Home = () => {
  return (
    <Container fluid={true}>
      {/*------------------------
                   HERO 
      -------------------------*/}
      <section className='hero' id='hero'>
        <Container style={{ padding: '40px 0 var(--section-padding)' }}>
          <Grid>
            <Grid.Col span={6}>
              <div style={{ marginBottom: '80px', maxWidth: '800px' }}>
                <Title className='hero-title'>Employ your potential.</Title>
                <Text className='hero-text'>
                  Looking for a new role? Create a profile on RecruitHub to connect directly with
                  growing tech teams. Hiring? We're the go-to platform for sourcing the best talent
                  out there.
                </Text>
                <Text
                  style={{
                    fontWeight: 'var(--fw-700)',
                    lineHeight: '1.8',
                    marginBottom: '15px '
                  }}
                >
                  Looking for?
                </Text>

                <TextInput
                  radius='xl'
                  size='lg'
                  placeholder='Job title, keywords, or location'
                  rightSectionWidth={90}
                  leftSection={
                    <IconSearch style={{ width: rem(22), height: rem(22) }} stroke={2} />
                  }
                  rightSection={
                    <a href='/search-job'>
                      <ActionIcon size={28} radius='xl' variant='filled'>
                        <IconArrowRight style={{ width: rem(26), height: rem(26) }} stroke={3} />
                      </ActionIcon>
                    </a>
                  }
                />
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div>
                <figure className='hero-banner'>
                  <img src={heroBannerImage} alt='Hero image' />
                </figure>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </section>{' '}
      {/*-----------------------------
                 Categories
      -----------------------------*/}
      <section style={{ backgroundColor: '#F0F5FC', paddingBottom: '60px' }}>
        <Container style={{ paddingTop: '60px' }}>
          <Text
            style={{
              fontSize: '30px',
              fontWeight: 'var(--fw-500)',
              lineHeight: '1.8',
              textAlign: 'center'
            }}
          >
            High Demanding Job Category
          </Text>
        </Container>

        <Container className='my-container'>
          {/* Card 1 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                marginBottom: '10px',
                backgroundColor: '#F0F5FC',
                borderRadius: '-60%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconDeviceLaptop size={28} color='#0A66C2'></IconDeviceLaptop>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Information Technology
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>

          {/* Card 2 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                backgroundColor: '#F9FBFF',
                marginBottom: '10px',

                borderRadius: '5%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconDeviceMobile color='#0A66C2'></IconDeviceMobile>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Mobile <br></br>Development
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>

          {/* Card 3 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                marginBottom: '10px',

                backgroundColor: '#F9FBFF',
                borderRadius: '5%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconReport color='#0A66C2'></IconReport>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Acounting & Management
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>

          {/* Card 4 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                marginBottom: '10px',

                backgroundColor: '#F9FBFF',
                borderRadius: '20%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconDatabase color='#0A66C2'></IconDatabase>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Database Administration
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>

          {/* Card 5 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                marginBottom: '10px',
                backgroundColor: '#F9FBFF',
                borderRadius: '5%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconBrandReactNative color='#0A66C2'></IconBrandReactNative>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Science
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>

          {/* Card 6 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                backgroundColor: '#F9FBFF',
                marginBottom: '10px',

                borderRadius: '5%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconMan color='#0A66C2'></IconMan>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Human Resources
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>

          {/* Card 7 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                marginBottom: '10px',
                backgroundColor: '#F9FBFF',
                borderRadius: '5%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconCalculator color='#0A66C2'></IconCalculator>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Accounting
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>

          {/* Card 8 */}
          <Paper className='my-paper' p='lg' shadow='md'>
            <div
              style={{
                width: '20%',
                height: '20%',
                marginBottom: '10px',

                backgroundColor: '#F9FBFF',
                borderRadius: '5%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconReportMoney color='#0A66C2'></IconReportMoney>
            </div>
            <Box>
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'text-decoration 0.3s',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Finance
              </Text>
              <Text
                size='sm'
                style={{
                  color: '#76797C',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                View job
              </Text>
            </Box>
          </Paper>
        </Container>
      </section>
      {/*------------------------------
                   CreateACCOUNT
      ----------------------------------*/}
      <section className='hero'>
        <Container style={{ padding: '20px 0px 0px ' }}>
          <Grid>
            <Grid.Col span={6}>
              <div style={{ marginBottom: '80px', maxWidth: '800px' }}>
                <Title
                  style={{
                    fontSize: 'var(--fs-2)',
                    fontWeight: 'var(--fw-500)',
                    paddingBottom: '20px',
                    paddingTop: '40px'
                  }}
                >
                  Hire better tech talent, faster.
                </Title>
                <Text className='hero-text'>
                  Looking to hire? The candidates on RecruitHub are qualified and ready to
                  interview.<br></br>
                  <br></br>Recruit the best employee for your company or business.
                </Text>
                <a href='/signup'>
                  <Button size='sm'>Create Employee account</Button>
                </a>{' '}
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div>
                <figure className='hero-banner'>
                  <img src={Hiring} alt='Hiring' />
                </figure>
              </div>
            </Grid.Col>
          </Grid>
        </Container>
      </section>
      {/*------------------------------
                   FindYourNeed
      ----------------------------------*/}
      <section className='hero' id='hero' style={{ padding: '40px 0px  80px 0px' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 'var(--fs-2)',
                fontWeight: 'var(--fw-500)',
                lineHeight: '1.8',
                marginTop: '5px'
              }}
            >
              Find your need with RecruitHub
            </Text>
          </div>
        </Container>

        <Container className='my-container-2'>
          {/* Card 1 */}
          <Paper className='my-paper-2'>
            <div
              style={{
                borderRadius: '2%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconUserSearch size={34} color='#76797C'></IconUserSearch>
            </div>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginBottom: '10px',
                  color: '#76797C'
                }}
              >
                100+
              </Text>
              <Text style={{ color: '#76797C' }}>Employers</Text>
            </Box>
          </Paper>

          {/* Card 2 */}
          <Paper className='my-paper-2'>
            <div
              style={{
                borderRadius: '2%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconBuilding size={34} color='#76797C'></IconBuilding>
            </div>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginBottom: '10px',
                  color: '#76797C'
                }}
              >
                50+
              </Text>
              <Text style={{ color: '#76797C' }}>Companies</Text>
            </Box>
          </Paper>

          {/* Card 3 */}
          <Paper className='my-paper-2'>
            <div
              style={{
                borderRadius: '2%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconListSearch size={34} color='#76797C'></IconListSearch>
            </div>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginBottom: '10px',
                  color: '#76797C'
                }}
              >
                100+
              </Text>
              <Text style={{ color: '#76797C' }}>Jobs Posted</Text>
            </Box>
          </Paper>
          {/* Card 4 */}
          <Paper className='my-paper-2'>
            <div
              style={{
                borderRadius: '2%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <IconMapSearch size={34} color='#76797C'></IconMapSearch>
            </div>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <Text
                size='md'
                style={{
                  fontWeight: 600,
                  textDecoration: 'none',
                  marginBottom: '10px',
                  color: '#76797C'
                }}
              >
                20+
              </Text>
              <Text style={{ color: '#76797C' }}>Moroccan Cities</Text>
            </Box>
          </Paper>
        </Container>
      </section>
      {/*------------------------------
                   Footer
      ----------------------------------*/}
      <footer>
        <div style={{ backgroundColor: '#F0F5FC' }}>
          <Container className='footer-grid'>
            <div className='footer-column'>
              <ul>
                <li>
                  <Text
                    size='xl'
                    style={{
                      fontWeight: '600',
                      textDecoration: 'underline',
                      marginBottom: '10px',
                      color: '#76797c'
                    }}
                  >
                    {' '}
                    Contact
                  </Text>
                </li>
              </ul>
              <p>+212661656789</p>
              <p>recruit-hub@gmail.com</p>
              <p>Tétouan, Morocco</p>
            </div>

            <div className='footer-column'>
              <ul>
                <li>
                  <Text
                    size='xl'
                    style={{
                      fontWeight: '600',
                      textDecoration: 'underline',
                      marginBottom: '10px',
                      color: '#76797c'
                    }}
                  >
                    Services
                  </Text>
                </li>
              </ul>

              <ul>
                <li>
                  <a href='/signup'>
                    <p>Jobs</p>
                  </a>
                </li>
              </ul>

              <ul>
                <li>
                  <a href='/signup'>
                    <p>Companies</p>
                  </a>
                </li>
              </ul>

              <ul>
                <li>
                  <a href='/signup'>
                    <p>About Us</p>
                  </a>
                </li>
              </ul>
            </div>

            <div className='footer-column'>
              <Text size='xl' className='footer-list-title'>
                <br></br>
              </Text>
              <div className='social-icons' style={{ display: 'flex', flexDirection: 'column' }}>
                <a href='#'>
                  <IconBrandFacebook color='#0A66C2'></IconBrandFacebook>
                </a>
                <a href='#'>
                  <IconBrandInstagram color='#0A66C2'></IconBrandInstagram>
                </a>
                <a href='#'>
                  <IconBrandLinkedin color='#0A66C2'></IconBrandLinkedin>
                </a>
              </div>
            </div>
          </Container>
        </div>
      </footer>
    </Container>
  );
};
export const HomeRoute = new Route({
  path: '/',
  component: Home,
  getParentRoute: () => defaultLayoutRoute
});
