import { useUserStore } from '../user.store';
import { useEffect, useState } from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const userStore = useUserStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    userStore.fetchUser().finally(() => {
      setIsHydrated(true);
    });
  }, [userStore]);

  if (!isHydrated) return <>Loading</>;

  return children;
};
