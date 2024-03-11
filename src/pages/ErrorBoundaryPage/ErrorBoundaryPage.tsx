import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Paths from '../../utils/paths';
import styles from './ErrorBoundaryPage.module.scss';
import Content from '../../components/ui/layout/Content/Content';
import { ActionButton } from '../../components/ui/ActionButton/ActionButton';

export const ErrorBoundaryPage = () => {
  const navigate = useNavigate();

  const handleMainClick = useCallback(() => {
    navigate(Paths.MAIN);
  }, [navigate]);

  return (
    <>
      <Content>
        <div className={styles.page}>
          <div className={styles.picture} />
          <div className={styles.text}>
            <h2 className={styles.title}>Упс! Что-то пошло не так</h2>
          </div>
          <div>
            <ActionButton
              text='На главную'
              type='button'
              onClick={handleMainClick}
            />
          </div>
        </div>
      </Content>
    </>
  );
};
