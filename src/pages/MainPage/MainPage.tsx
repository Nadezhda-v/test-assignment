import React, { FC } from 'react';

import Page from '../../components/ui/layout/Page/Page';
import { CatFactForm } from '../../forms/CatFactForm/CatFactForm';
import { AgeForm } from '../../forms/AgeForm/AgeForm';

export const MainPage: FC = () => {
  return (
    <Page>
      <CatFactForm />
      <AgeForm />
    </Page>
  );
};
