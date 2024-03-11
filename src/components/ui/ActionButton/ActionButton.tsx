import { FC } from 'react';
import cn from 'classnames';

import styles from './ActionButton.module.scss';

type ActionButtonProps = {
  text?: string;
  className?: string | string[];
  type: 'button' | 'submit';
  onClick?: () => void;
};

export const ActionButton: FC<ActionButtonProps> = ({
  text,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      className={cn('button', styles.actionButton, className)}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
