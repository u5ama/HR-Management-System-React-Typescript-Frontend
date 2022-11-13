import AxiosContext from '.';
import { PropsWithChildren, useContext, useEffect } from 'react';
import axiosClient from '@lib/axios';
import AuthContext from '@contexts/auth';

function AxiosInterceptorsProvider({ children }: PropsWithChildren) {
  const { setTokenExpired } = useContext(AuthContext);

  useEffect(() => {
    axiosClient.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        if (error.response?.data.message === 'Token is Expired') {
          setTokenExpired(true);
        }

        return Promise.reject(error);
      }
    );
  }, [setTokenExpired]);

  return <AxiosContext.Provider value={{}}>{children}</AxiosContext.Provider>;
}

export default AxiosInterceptorsProvider;
