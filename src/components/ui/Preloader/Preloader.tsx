import { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface PreloaderProps {
  color: string;
  size?: number;
}

export const Preloader: FC<PreloaderProps> = ({ color, size }) => (
  <ClipLoader
    color={color}
    cssOverride={{ display: 'block', margin: 'auto' }}
    size={size}
  />
);
