import { Router } from '@tanstack/react-router';
import { defaultRoute } from './default-layout';
import { loginRoute } from './auth/login';
import { RouterProvider } from '@tanstack/react-router';
import { signUpRoute } from './auth/singup';
import { forgotPasswordRoute } from './auth/forgot-password';

const routeTree = defaultRoute.addChildren([loginRoute, signUpRoute, forgotPasswordRoute]);

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
