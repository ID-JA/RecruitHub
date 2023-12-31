import { MutationFunction, MutationOptions, useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { notifications } from '@mantine/notifications';
import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';
import { TUser, useAuthStore } from '../store';

export const authenticationSchema = z.object({
  password: z.string().min(6, { message: 'Name should have at least 6 letters' }),
  email: z.string().email({ message: 'Invalid email' })
});

// The payload sent when authenticating a user
interface TAuthPayload {
  email: string;
  password: string;
}

// The response received when a user is successfully authenticated
interface TAuthResponse {
  data: {
    token: string;
    user: TUser;
  };
}

// The error received when authentication fails
export interface TAuthError {
  response: {
    data: {
      error: string;
    };
  };
}

export const authenticateUser = async (credentials: TAuthPayload): Promise<TAuthResponse> => {
  return await axiosInstance.post('login', credentials);
};

export const useAuthenticate = () => {
  const router = useRouter();
  const authStore = useAuthStore();

  const mutationFn: MutationFunction<TAuthResponse, TAuthPayload> = authenticateUser;

  const mutationOptions: MutationOptions<TAuthResponse, TAuthError, TAuthPayload, unknown> = {
    mutationFn,
    onSuccess(response) {
      localStorage.setItem('token', response.data.token);
      authStore.setIsLoggedIn(true);
      authStore.setUser(response.data.user);
      if (response.data.user.role === 'recruiter') {
        router.history.replace('/portal');
      } else {
        console.log('else');
        router.history.replace('/jobs-board');
      }
    },
    onError(error) {
      notifications.show({
        color: 'red',
        title: error.response.data.error,
        message: 'Email / password is wrong'
      });
    }
  };

  const mutation = useMutation<TAuthResponse, TAuthError, TAuthPayload, unknown>(mutationOptions);

  const authenticate = (data: TAuthPayload) => mutation.mutate(data);

  return { authenticate, mutation };
};

type TRecruiterSignUp = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
};

export const registerUser = async (payload: TRecruiterSignUp) => {
  return await axiosInstance.post('/register', payload);
};
