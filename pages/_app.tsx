import '@app/styles/globals.css';
import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material';
import theme from '@app/styles/theme';
import Layout from '@app/components/Layout';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
