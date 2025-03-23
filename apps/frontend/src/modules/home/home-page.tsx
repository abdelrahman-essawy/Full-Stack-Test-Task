import { BackgroundLines } from '../../ui/background-lines';
import { Cover } from '../../ui/cover';
import { useUserStore } from '../auth/user.store';

export const HomePage = () => {
  const name = useUserStore((state) => state.user?.name);
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text  text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Welcome to the <Cover>Application!</Cover>
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        Huge thanks to {name} for testing my website! You made history… kind of.
        😆
      </p>
    </BackgroundLines>
  );
};
