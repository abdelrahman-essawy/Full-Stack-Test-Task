import { LabelInputContainer } from '../../ui/label-input-container';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { AuthForm } from './components/form';
import { useAuthActions } from './user-auth-actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@easygenerator/validations';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { login } = useAuthActions();

  return (
    <AuthForm
      title="Welcome Back to"
      subtitle="Log in to continue"
      buttonText="Log in"
      footerLink={{
        title: "Don't have an account?",
        href: '/signup',
        hrefText: 'Sign up',
      }}
      onSubmit={handleSubmit((data) => login.mutateAsync({ body: data }))}
      isPending={login.isPending}
    >
      <LabelInputContainer>
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          {...register('email')}
          placeholder="you@example.com"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </LabelInputContainer>

      <LabelInputContainer>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register('password')}
          placeholder="••••••••"
          type="password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </LabelInputContainer>
    </AuthForm>
  );
};
