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
import { NotFoundRoute } from './NotFound/NotFound';
import { resetPasswordRoute } from './auth/reset-password';
import { profileRoute } from './profile/profile';
import { SearchjobRoute } from './SearchPage/Searchjob';
import { jobsBoardRoute } from './job-board/jobs-board';

export const rootRoute = new RootRoute();
const routeTree = rootRoute.addChildren([
  portalLayoutRoute.addChildren([
    jobsRoute,
    dashboardRoute,
    messagesRoute,
    candidatesRoute,
    settingsRoute,
    interviewsRoute,
    NotFoundRoute
  ]),

  defaultLayoutRoute.addChildren([
    HomeRoute,
    loginRoute,
    signUpRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    profileRoute,
    SearchjobRoute,
    jobsBoardRoute
  ])
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
