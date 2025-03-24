import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const PrimaryButton = (
  props: PropsWithChildren<ButtonHTMLAttributes<unknown>>
) => {
  return (
    <button
      className="px-4 py-2 w-full text-white backdrop-blur-sm border border-primary rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-primary text-sm transition duration-200"
      type="submit"
      {...props}
    >
      {props.children}
    </button>
  );
};
