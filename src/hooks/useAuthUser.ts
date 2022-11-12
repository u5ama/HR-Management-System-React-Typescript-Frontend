import { useContext } from 'react';
import { AuthContext } from 'src/App';

function useAuthUser() {
  const { user } = useContext(AuthContext)!;

  return user;
}

export default useAuthUser;
