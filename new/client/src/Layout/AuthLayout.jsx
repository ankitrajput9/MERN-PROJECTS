import React, { useState } from 'react';
import RegisterPage from '../components/RegisterPage';
import LoginPage from '../components/LoginPage';

const AuthLayout = () => {
  
 const [flag, setFlag] = useState(true)
 
  return (
   <>
      {flag ?<LoginPage setFlag={setFlag} /> :<RegisterPage setFlag={setFlag} /> }
   </>
    
  );
}

export default AuthLayout;
