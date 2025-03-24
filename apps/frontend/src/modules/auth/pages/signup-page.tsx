import { LabelInputContainer } from '../../../ui/label-input-container';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { AuthForm } from '../components/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordRules, signUpSchema } from '@easygenerator/validations';
import { useState } from 'react';
import { PasswordValidation } from '../components/password-validation';
import { CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthActions } from '../user-auth-actions';
import { Container } from '../../../components/container';

export const SignupPage = () => {
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup } = useAuthActions();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const password = watch('password');

  return (
    <Container>
      <AuthForm
        title="Welcome to"
        subtitle="Register to get started"
        buttonText="Sign up"
        footerLink={{
          title: 'Already have an account?',
          href: '/login',
          hrefText: 'Log in',
        }}
        onSubmit={handleSubmit((data) => signup.mutateAsync({ body: data }))}
        isPending={signup.isPending}
      >
        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="John Doe"
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </LabelInputContainer>

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

        <div className="flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...register('password')}
              placeholder="••••••••"
              type="password"
            />
            <PasswordValidation password={password} rules={passwordRules} />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
            />
            {password && confirmPassword && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex items-center space-x-2 text-sm mt-1 ${
                  password === confirmPassword
                    ? 'text-green-600'
                    : 'text-red-500'
                }`}
              >
                {password === confirmPassword ? (
                  <CheckCircle size={16} />
                ) : (
                  <XCircle size={16} />
                )}
                <span>
                  {password === confirmPassword
                    ? 'Passwords match'
                    : 'Passwords do not match'}
                </span>
              </motion.div>
            )}
          </LabelInputContainer>
        </div>
      </AuthForm>
    </Container>
  );
};
