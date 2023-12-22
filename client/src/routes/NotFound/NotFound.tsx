import { Image, Container, Title, Text, Button, SimpleGrid } from '@mantine/core';
import image from '../../assets/NotFound/NotFound.jpeg';
import classes from './NotFound.module.css';
import { Link, Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';

function NotFound() {
  return (
    <Container className={classes.root}>
      <SimpleGrid
        spacing={{ base: 40, sm: 80 }}
        cols={{ base: 1, sm: 2 }}
        style={{ alignItems: 'center' }}
      >
        <Image src={image} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c='dimmed' size='lg'>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Link to={'/'}>
            <Button variant='outline' size='md' mt='xl' className={classes.control}>
              Get back to home page
            </Button>
          </Link>
        </div>
        <Image src={image} className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}

export const NotFoundRoute = new Route({
  path: '*',
  component: NotFound,
  getParentRoute: () => defaultLayoutRoute
});
