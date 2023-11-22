import { Route } from '@tanstack/react-router';
import { defaultRoute } from '../default-layout';

export function ForgotPassword() {
  return (
    <div>
      <h1>Iam forgot password page</h1>
    </div>
  );
}

export const forgotPasswordRoute = new Route({
  path: 'forgot-password',
  component: ForgotPassword,
  getParentRoute: () => defaultRoute
});
