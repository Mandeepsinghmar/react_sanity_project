import React from 'react';
import GoogleLogin from 'react-google-login';

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response.profileObj);
  };
  return (
    <>
      <GoogleLogin
        clientId='820339122389-20j5josq7739gtnk2giki5ttl43t8nbd.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </>
  );
};

export default Login;
