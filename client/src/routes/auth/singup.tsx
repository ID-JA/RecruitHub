import { Route } from '@tanstack/react-router';
import { defaultRoute } from '../default-layout';

export function SignUp() {
  return <h1>I am Sign up page</h1>;
}

export const signUpRoute = new Route({
  path: 'signup',
  component: SignUp,
  getParentRoute: () => defaultRoute
});
