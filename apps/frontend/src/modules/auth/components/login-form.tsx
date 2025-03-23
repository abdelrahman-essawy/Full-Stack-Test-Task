'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authControllerLoginMutation } from '@easygenerator/api-sdk';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { LabelInputContainer } from '../../../ui/label-input-container';
import { NavLink, useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function LoginForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation({
    ...authControllerLoginMutation(),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/home');
    },
    onError: (error) => toast.error(error.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    await mutateAsync({ body: data });
  };

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-xl bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black shadow">
      <h2 className="text-center mt-4 md:mt-0 md:text-left text-xl font-bold text-[#363E4E] dark:text-neutral-200">
        Welcome Back to <span className="text-[#F0754D]">EasyGenerator</span>
      </h2>
      <p className="text-center md:text-left mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Log in to continue
      </p>

      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
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

        <LabelInputContainer className="mb-4">
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

        <button
          className="px-4 py-2 w-full text-white backdrop-blur-sm border border-primary rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-primary text-sm transition duration-200"
          type="submit"
          disabled={isPending}
        >
          Log in &rarr;
        </button>
      </form>

      <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

      <p className="text-sm text-neutral-600 dark:text-neutral-300">
        Don't have an account?{' '}
        <NavLink
          to="/"
          className="text-[#F0754D] hover:underline transition duration-200"
        >
          Sign up
        </NavLink>
      </p>
    </div>
  );
}
