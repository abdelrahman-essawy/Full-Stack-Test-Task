import { Cover } from '../../ui/cover';
import { useAuthStore } from '../auth/use-auth-store';
import { Container } from '../../components/container';

export const HomePage = () => {
  const name = useAuthStore((state) => state.user?.name);
  return (
    <Container>
      <h2 className="bg-clip-text  text-center bg-gradient-to-b from-neutral-900 to-neutral-700 text-2xl md:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Welcome to the{' '}
        <Cover className={'bg-clip-text text-primary'}>Application!</Cover>
      </h2>
      <p className="max-w-2xl mx-auto text-sm md:text-lg text-neutral-700 text-center">
        Huge thanks to <span className="text-primary font-bold">{name}</span>{' '}
        for testing my website! You made history… kind of. 😆
      </p>
    </Container>
  );
};
