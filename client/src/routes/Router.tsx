import { Router } from '@tanstack/react-router';
import { defaultRoute } from './default-layout';
import { loginRoute } from './auth/login';
import { RouterProvider } from '@tanstack/react-router';
import { signUpRoute } from './auth/singup';
import { forgotPasswordRoute } from './auth/forgot-password';
import { jobsRoute } from './auth/jobs';

const routeTree = defaultRoute.addChildren([
  loginRoute,
  signUpRoute,
  forgotPasswordRoute,
  jobsRoute
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
