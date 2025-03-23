'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordRules, signUpSchema } from '@easygenerator/validations';
import { authControllerSignupMutation } from '@easygenerator/api-sdk';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { cn } from '../../../utils';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

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
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black shadow">
      <h2 className="text-xl font-bold text-[#363E4E] dark:text-neutral-200">
        Welcome to <span className="text-[#F0754D]">EasyGenerator</span>
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
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

        <div className="mb-4 flex flex-col md:flex-row md:space-x-2">
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
          className="group relative flex w-full items-center justify-center rounded-md bg-[#F0754D] py-2 text-white hover:bg-[#D96744] transition duration-200"
          type="submit"
          disabled={isPending}
        >
          Sign up &rarr;
        </button>
      </form>
    </div>
  );
}

const PasswordValidation = ({
  password,
  rules,
}: {
  password: string;
  rules: {
    rule: RegExp;
    label: string;
  }[];
}) => {
  return (
    <div className="mt-2 space-y-1 text-sm">
      {rules.map(({ rule, label }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`flex items-center space-x-2 ${
            rule.test(password) ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {rule.test(password) ? (
            <CheckCircle size={16} />
          ) : (
            <XCircle size={16} />
          )}
          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  );
};
const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
