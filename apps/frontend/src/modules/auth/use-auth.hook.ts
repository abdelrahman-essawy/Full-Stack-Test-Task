import { useQuery } from '@tanstack/react-query';
import { userControllerGetCurrentUserOptions } from '@easygenerator/api-sdk';
import { useUserStore } from './user.store';

export const useAuth = () => {
  const { data, isLoading, isSuccess } = useQuery({
    ...userControllerGetCurrentUserOptions(),
    retry: 0,
  });

  if (isSuccess && data) {
    useUserStore.setState({ user: data.user });
    return {
      isLoading,
      isAuthenticated: true,
    };
  }

  return {
    isLoading,
    isAuthenticated: false,
  };
};
