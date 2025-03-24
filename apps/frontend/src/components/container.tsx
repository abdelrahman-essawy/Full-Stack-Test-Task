import { ReactNode } from 'react';

export const Container = ({ children }: { children: ReactNode }) => {
  return <div className="px-4 md:px-0">{children}</div>;
};
