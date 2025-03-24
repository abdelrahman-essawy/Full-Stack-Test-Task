'use client';
import React, { ReactNode } from 'react';
import { cn } from '../utils';

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  header?: ReactNode;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          'transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-[#FCE2D5]/20 text-[#3D1E12]',
          className
        )}
        {...props}
      >
        {props.header}
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              '--aurora':
                'repeating-linear-gradient(100deg,#F0754D_10%,#F48A68_15%,#F7A891_20%,#FBC4B0_25%,#FCE2D5_30%)',
              '--dark-gradient':
                'repeating-linear-gradient(100deg,#3D1E12_0%,#3D1E12_7%,transparent_10%,transparent_12%,#3D1E12_16%)',
              '--white-gradient':
                'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',

              '--orange-500': '#F0754D',
              '--orange-400': '#F48A68',
              '--peach-300': '#F7A891',
              '--coral-200': '#FBC4B0',
              '--beige-100': '#FCE2D5',
              '--brown-900': '#3D1E12',
              '--brown-800': '#573627',
              '--black': '#000',
              '--white': '#fff',
              '--transparent': 'transparent',
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--orange-500)_10%,var(--orange-400)_15%,var(--peach-300)_20%,var(--coral-200)_25%,var(--beige-100)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--brown-900)_0%,var(--brown-900)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--brown-900)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
