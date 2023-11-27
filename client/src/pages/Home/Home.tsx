import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import './Home.css';
import Hero from './components/Hero/Hero';
import Categorie from './components/Categories/Categorie';
import Banner from './components/Banner/Banner';

export const Home = () => {
  return (
    <div className='home-container'>
      <Hero />
      <Banner />
      <Categorie />
    </div>
  );
};

export const HomeRoute = new Route({
  path: '/',
  id: 'home-page',
  component: Home,
  getParentRoute: () => defaultLayoutRoute
});
