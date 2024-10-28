import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../ui_comp/useAuth';
const AdminRoute = ({ element }) => {
  const { isAdmin, loading } = useAuth(); // Now it also returns a loading state

  // While checking admin status, you may want to show a loading spinner or message
  if (loading) {
    return <div>Loading...</div>; // This could be a spinner or loading indicator
  }

  // If the user is not an admin, navigate them back to the home page
  return isAdmin ? element : <Navigate to="/" />;
};

export default AdminRoute;
