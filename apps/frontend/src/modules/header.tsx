import { useNavigate } from 'react-router-dom';
import LogoSvg from '../assets/logo.svg';
import { useAuth } from './auth/use-auth.hook';
import { authControllerLogout } from '@easygenerator/api-sdk';
import { useUserStore } from './auth/user.store';

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await authControllerLogout();
    useUserStore.setState({ user: null });
    navigate('/login');
  };

  return (
    <div className="absolute top-4 px-4 w-full flex justify-between items-center z-10">
      <LogoSvg />
      {isAuthenticated && (
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
