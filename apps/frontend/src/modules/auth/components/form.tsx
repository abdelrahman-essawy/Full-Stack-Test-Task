'use client';
import React from 'react';
import { authControllerLoginMutation } from '@easygenerator/api-sdk';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { cn } from '../../../utils';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function SignupForm() {
  const { isPending, mutateAsync } = useMutation({
    ...authControllerLoginMutation(),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.loading(error.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
    await mutateAsync({
      body: {
        email: 'sad',
        password: '123456789',
      },
    });
  };
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black shadow">
      <h2 className="text-xl font-bold text-[#363E4E] dark:text-neutral-200">
        Welcome to
        <span className="text-[#F0754D]"> EasyGenerator</span>
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Register to get started
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Abdelrahman Essawy" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Confirm Password</Label>
            <Input id="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>
        </div>

        <button
          className="group relative flex w-full items-center justify-center rounded-md bg-[#F0754D] py-2 text-white hover:bg-[#D96744] ease-in-out transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};
