import clsx from 'clsx';
import React from 'react';

type titleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface Props {
  size?: titleSize;
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ size = 'sm', text, className }) => {
  const tagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
    '2xl': 'h1',
  } as const;

  const tagClassName = {
    xs: 'text-[16px]',
    sm: 'text-[22px]',
    md: 'text-[26px]',
    lg: 'text-[32px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]',
  } as const;
  return React.createElement(
    tagBySize[size],
    { className: clsx(tagClassName[size], className) },
    text,
  );
};
