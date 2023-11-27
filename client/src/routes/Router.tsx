import { RootRoute, Router } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../layouts/default-layout';
import { RouterProvider } from '@tanstack/react-router';
import { jobsRoute } from './jobs';
import { portalLayoutRoute } from '../layouts/portal-layout';
import { dashboardRoute } from './dashboard';
import { messagesRoute } from './messages';
import { candidatesRoute } from './candidates';
import { settingsRoute } from './settings';
import { interviewsRoute } from './interviews';
import { loginRoute } from './auth/login';
import { signUpRoute } from './auth/singup';
import { forgotPasswordRoute } from './auth/forgot-password';
import { HomeRoute } from './Home/Home';
export const rootRoute = new RootRoute();
const routeTree = rootRoute.addChildren([
  portalLayoutRoute.addChildren([
    jobsRoute,
    dashboardRoute,
    messagesRoute,
    candidatesRoute,
    settingsRoute,
    interviewsRoute
  ]),
  defaultLayoutRoute.addChildren([HomeRoute, loginRoute, signUpRoute, forgotPasswordRoute])
]);

export const router = new Router({
  routeTree
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
