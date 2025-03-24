import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  client,
  User,
  userControllerGetCurrentUser,
} from '@easygenerator/api-sdk';
import { env } from '../../env';

client.setConfig({
  baseUrl: env.REACT_APP_API_URL,
  credentials: 'include',
});

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  fetchCurrentUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => {
    const fetchCurrentUser = async () => {
      userControllerGetCurrentUser()
        .then(({ data }) => {
          set({ user: data?.user });
        })
        .finally(() => set({ isLoading: false }));
    };

    fetchCurrentUser();

    return {
      user: null,
      isLoading: true,
      fetchCurrentUser,
    };
  })
);
