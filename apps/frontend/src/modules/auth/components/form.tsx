'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordRules, signUpSchema } from '@easygenerator/validations-nest';
import { authControllerSignupMutation } from '@easygenerator/api-sdk';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { LabelInputContainer } from '../../../ui/label-input-container';
import { PasswordValidation } from './password-validation';
import { NavLink } from 'react-router-dom';

export function SignupForm() {
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutateAsync, isPending } = useMutation({
    ...authControllerSignupMutation(),
    onSuccess: (data) => toast.success(data.message),
    onError: (error) => toast.error(error.message),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const password = watch('password');

  const onSubmit = async (data: any) => {
    await mutateAsync({ body: data });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-xl bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black shadow">
      <h2 className="text-center mt-4 md:mt-0 md:text-left text-xl font-bold text-[#363E4E] dark:text-neutral-200">
        Welcome to <span className="text-[#F0754D]">EasyGenerator</span>
      </h2>
      <p className="text-center md:text-left mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Register to get started
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
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

        <LabelInputContainer className="mb-4">
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

        <div className="mb-4 flex flex-col md:flex-row md:space-x-2 space-y-4 md:space-y-0">
          <LabelInputContainer className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              {...register('password')}
              placeholder="••••••••"
              type="password"
            />
            <PasswordValidation password={password} rules={passwordRules} />
          </LabelInputContainer>

          <LabelInputContainer className="w-full">
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
                  <>
                    <CheckCircle size={16} />
                    <span>Passwords match</span>
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    <span>Passwords do not match</span>
                  </>
                )}
              </motion.div>
            )}
          </LabelInputContainer>
        </div>

        <button
          className="px-4 py-2 w-full text-white backdrop-blur-sm border border-primary rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-primary text-sm transition duration-200"
          type="submit"
          disabled={isPending}
        >
          Sign up &rarr;
        </button>
      </form>

      <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Already have an account?{' '}
        <NavLink
          to="/login"
          className="text-[#F0754D] hover:underline transition duration-200"
        >
          Log in
        </NavLink>
      </p>
    </div>
  );
}
