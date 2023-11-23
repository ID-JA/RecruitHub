import { Link, Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';

const Login = () => {
  return (
    <div>
      <h1>Login Content</h1>
      <Link to='/forgot-password'>go to Forgot Password page</Link>
    </div>
  );
};

export const loginRoute = new Route({
  path: 'login',
  component: Login,
  getParentRoute: () => defaultLayoutRoute
});
