import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { notifications } from '@mantine/notifications';
import { useRouter } from '@tanstack/react-router';
import { z } from 'zod';

export const authenticationSchema = z.object({
  password: z.string().min(6, { message: 'Name should have at least 6 letters' }),
  email: z.string().email({ message: 'Invalid email' })
});

type TAuthPayload = {
  email: string;
  password: string;
};

type TAuthResponse = {
  token: string;
};

export const authenticateUser = async (credentials: TAuthPayload): Promise<TAuthResponse> => {
  return await axiosInstance.post('login', credentials);
};

export const useAuthenticate = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess() {
      router.history.replace('/portal/');
    },
    onError(error) {
      notifications.show({
        color: 'red',
        title: error.response.data.error,
        message: 'Email / password is wrong'
      });
    }
  });
  const authenticate = (data: TAuthPayload) => mutation.mutate(data);

  return { authenticate, mutation };
};
