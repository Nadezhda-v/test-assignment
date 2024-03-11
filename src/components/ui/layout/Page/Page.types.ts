import { ReactNode } from 'react';

export interface IPageProps {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}
