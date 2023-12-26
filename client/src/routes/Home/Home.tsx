import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import './Home.css';
import Hero from './components/Hero/Hero';
import Categorie from './components/Categories/Categorie';
import Banner from './components/Banner/Banner';
import { Container } from '@mantine/core';

export const Home = () => {
  return (
    <Container fluid={true} className='home-container'>
      <Hero />
      <Banner />
      <Categorie />
    </Container>
  );
};

export const HomeRoute = new Route({
  path: '/',
  component: Home,
  getParentRoute: () => defaultLayoutRoute
});
