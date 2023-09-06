import React from 'react';
import Logo from './assets/logo_type.svg';
import { styled } from 'styled-components';

const HeaderWrapper = styled.nav`
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1000;
  min-height: 64px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: linear-gradient(90deg, #cafffc 20.76%, #fecaff 74.26%);

  background-blend-mode: multiply;
`;

const Header: React.FC = () => (
  <HeaderWrapper>
    <Logo />
  </HeaderWrapper>
);

export default Header;
