import {
  authControllerLoginMutation,
  authControllerLogout,
  authControllerSignupMutation,
} from '@easygenerator/api-sdk';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from './use-auth-store';

export const useAuthActions = () => {
  const navigate = useNavigate();

  const login = useMutation({
    ...authControllerLoginMutation(),
    onSuccess: (data) => {
      useAuthStore.setState({ user: data.user });
      toast.success(data.message);
      navigate('/');
    },
    onError: (error) => toast.error(error.description),
  });
  const logout = async () => {
    await authControllerLogout();
    useAuthStore.setState({ user: null });
    navigate('/login');
  };

  const signup = useMutation({
    ...authControllerSignupMutation(),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/login');
    },
    onError: (error) => toast.error(error.message),
  });
  return {
    login,
    logout,
    signup,
  };
};
