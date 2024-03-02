export const PrivateRoute = ({ element, isLoggedIn, userType, expectedUserType }) => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      return <Navigate to="/" />;
    }
  
    // Check if the user type matches the expected user type
    if (userType !== expectedUserType) {
      // Redirect to login if user type doesn't match
      return <Navigate to="/" />;
    }
  
    // Render the protected route
    return element;
  };