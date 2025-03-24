import LogoSvg from '../assets/logo.svg';
import { useAuthActions } from '../modules/auth/user-auth-actions';
import { useAuthStore } from '../modules/auth/use-auth-store';

export const Navbar = () => {
  const { user } = useAuthStore();
  const { logout } = useAuthActions();

  return (
    <div className="absolute top-4 px-4 w-full flex justify-between items-center z-10">
      <LogoSvg />
      {user && (
        <button
          onClick={logout}
          className="px-5 py-2 text-primary font-medium bg-white/20 backdrop-blur-md border border-primary rounded-lg shadow-md hover:bg-white/30 hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          Log out
        </button>
      )}
    </div>
  );
};
