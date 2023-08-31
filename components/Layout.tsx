import React, { FC, ReactNode } from 'react';
import Header from './Header/Header';
import styled from '@emotion/styled';

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f4e2;
  padding-top: 0;
`;

const MainLayout = styled.main`
  padding: 32px 16px;
`;

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <Root>
    <Header />
    <MainLayout>{children}</MainLayout>
  </Root>
);

export default Layout;
