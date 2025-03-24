import { PrimaryButton } from '../components/primary-button';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={'text-center max-w-md mx-auto'}>
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <p className="my-4 text-lg text-text-secondary font-medium">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className={'w-32 mx-auto'}>
        <PrimaryButton onClick={() => navigate('/')}>
          Go back home
        </PrimaryButton>
      </div>
    </div>
  );
};
