import { FC } from 'react';
import cn from 'classnames';

import { IPageProps } from './Page.types';
import styles from './Page.module.scss';
import { Preloader } from '../../Preloader/Preloader';

const Page: FC<IPageProps> = ({ children, loading = false, className }) => {
  return (
    <div className={cn('container', styles.page, className)}>
      {loading ? <Preloader color='#0077ff' size={30} /> : <>{children}</>}
    </div>
  );
};

export default Page;
