import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '../utils';

export const LabelInputContainer = (
  props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>
) => {
  return (
    <div
      {...props}
      className={cn('flex w-full flex-col space-y-2', props.className)}
    >
      {props.children}
    </div>
  );
};
