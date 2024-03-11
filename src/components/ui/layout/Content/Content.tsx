import React, { FC, ReactNode } from 'react';

import styles from './Content.module.scss';

interface IContentProps {
  children: ReactNode;
}

const Content: FC<IContentProps> = ({ children }) => {
  return <div className={styles.contentContainer}>{children}</div>;
};

export default Content;
