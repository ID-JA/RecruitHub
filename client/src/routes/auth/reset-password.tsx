import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';

export function ResetPassword() {
  return <div> heyy reset-password</div>;
}

export const resetPasswordRoute = new Route({
  path: 'reset-password',
  component: ResetPassword,
  getParentRoute: () => defaultLayoutRoute
});
