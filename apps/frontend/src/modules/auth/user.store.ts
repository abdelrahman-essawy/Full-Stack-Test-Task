import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User, userControllerGetCurrentUser } from '@easygenerator/api-sdk';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  fetchUser: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  devtools((set) => {
    const fetchUser = async () => {
      userControllerGetCurrentUser()
        .then((response) => {
          set({ user: response.data?.user }, false, 'fetchUser');
        })
        .catch((error) => {
          console.error(error);
        });
    };

    // fetchUser();

    return {
      user: null,
      setUser: (user) => set({ user }, false, 'setUser'),
      clearUser: () => set({ user: null }, false, 'clearUser'),
      fetchUser,
    };
  })
);
