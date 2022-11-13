import { useContext } from 'react';
import AuthContext from '@contexts/auth';

function useAuth() {
  const { user, login, logout } = useContext(AuthContext)!;

  return { user, login, logout };
}

function useAuthHeader() {
  const { user } = useAuth();

  return {
    Authorization: `Bearer ${user?.token}`,
  };
}

export default useAuth;
export { useAuth, useAuthHeader };
