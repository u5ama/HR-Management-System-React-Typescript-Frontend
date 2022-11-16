import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import { AxiosInterceptorsProvider } from '@contexts/axios';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@contexts/auth';

const queryClient = new QueryClient();

const routerBaseName = import.meta.env.VITE_SUB_DIR_PATH || '';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <BrowserRouter basename={routerBaseName}>
            <AuthProvider>
              <AxiosInterceptorsProvider>
                <App />
              </AxiosInterceptorsProvider>
            </AuthProvider>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
