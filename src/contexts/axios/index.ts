// import { AxiosInstance } from 'axios';
import { createContext } from 'react';
import AxiosInterceptorsProvider from './AxiosInterceptorsProvider';

interface IAxiosContext {
  // axiosClient: AxiosInstance;
}

const AxiosContext = createContext<IAxiosContext>({} as IAxiosContext);

export default AxiosContext;
export { AxiosInterceptorsProvider };
