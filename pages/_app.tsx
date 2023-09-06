import '@app/styles/globals.css';
import React from 'react';
import { AppProps } from 'next/app';
import Layout from '@app/components/Layout';
import { GlobalStyle } from '@app/styles/global';
import { ThemeProvider } from 'styled-components';
import theme from '@app/styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
