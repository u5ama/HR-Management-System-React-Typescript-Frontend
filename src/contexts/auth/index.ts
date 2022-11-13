import { IAuthenticatedUser } from '@app-types/auth';
import { createContext } from 'react';
import AuthProvider from './AuthProvider';

interface IAuthContext {
  user: IAuthenticatedUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  removeUser: () => void;
  setTokenExpired: React.Dispatch<React.SetStateAction<boolean>>;
}

// const initialValues: IAuthContext = {
//   user: null,
//   async login() {},
//   async logout() {},
//   removeUser() {},
// };

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default AuthContext;
export { AuthProvider };
