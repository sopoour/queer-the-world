import React, { FC, ReactNode } from 'react';
import Header from './Header/Header';
import { styled } from 'styled-components';

const Root = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f4e2;
`;

const MainLayout = styled.main`
  max-width: 1000px;
  padding: 48px 20px;
  flex: 1;
  width: 100%;
  margin: 0 auto;
  background: #f5f4e2;
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
