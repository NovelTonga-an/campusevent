import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // If user is not logged in → redirect to /login (Step 6)
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;