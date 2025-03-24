import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { PrimaryButton } from '../../../components/primary-button';

// @ts-expect-error - we are passing children to the form
interface AuthFormProps extends Partial<HTMLFormElement> {
  title: string;
  subtitle: string;
  buttonText: string;
  isPending: boolean;
  footerLink: {
    title: string;
    href: string;
    hrefText: string;
  };
  children: ReactNode;
}

export const AuthForm = ({
  title,
  subtitle,
  buttonText,
  onSubmit,
  isPending,
  footerLink,
  children,
}: AuthFormProps) => (
  <div className="shadow-input mx-auto w-full max-w-md rounded-xl bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black shadow">
    <h2 className="text-center mt-4 md:mt-0 md:text-left text-xl font-bold text-[#363E4E] dark:text-neutral-200">
      {title} <span className="text-[#F0754D]">EasyGenerator</span>
    </h2>
    <p className="text-center md:text-left mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
      {subtitle}
    </p>

    <form className="my-8 flex flex-col space-y-4" onSubmit={onSubmit}>
      {children}
      <PrimaryButton>{buttonText} &rarr;</PrimaryButton>
    </form>

    <div className="my-4 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

    <BottomLink {...footerLink} />
  </div>
);

export const BottomLink = ({
  title,
  href,
  hrefText,
}: AuthFormProps['footerLink']) => (
  <p className="text-sm text-neutral-600 dark:text-neutral-300">
    {title}{' '}
    <NavLink
      to={href}
      className="text-[#F0754D] hover:underline transition duration-200"
    >
      {hrefText}
    </NavLink>
  </p>
);
