import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useAuthorization = (allowedRoles) => {
  const history = useHistory();
  const userRole = 'Admin'; // Gantilah dengan role pengguna yang sesuai

  useEffect(() => {
    if (!allowedRoles.includes(userRole)) {
      // Redirect ke halaman tidak diizinkan jika pengguna tidak memiliki role yang sesuai
      history.push('/unauthorized');
    }
  }, [userRole, allowedRoles, history]);
};

export default useAuthorization;
