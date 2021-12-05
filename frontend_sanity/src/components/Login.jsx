import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl, givenName, familyName } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
      slug: `${givenName}-${familyName}`,
    };
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <div className=" hidden md:flex gap-2 py-5 items-center justify-center">
        <button type="button" className="bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold">
          S
        </button>
        <h2 className="font-extrabold text-xl ">ShareMe</h2>
      </div>
      <div className="mt-6 flex flex-col justify-center items-center gap-5 relative">
        <p className=" text-3xl md:text-5xl font-semibold mb-4 text-center">Sign in to get your ideas</p>
        <div className="absolute bottom-40">
          <GoogleLogin
            clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
            render={(renderProps) => (
              <button
                type="button"
                className="bg-white p-2 pl-4 pr-4 text-2xl w-300 rounded-3xl flex items-center justify-center text-dark  hover:opacity-95 outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className="mr-4" /> Sign in with google
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          />
        </div>
        <img
          className="w-96 h-96 rounded-2xl"
          src="https://media.istockphoto.com/photos/fingerprint-biometric-authentication-button-digital-security-concept-picture-id1299730469?b=1&k=20&m=1299730469&s=170667a&w=0&h=w-vAa1MLy__YKtTR41J5ollZjdW0oe9lOmAMdwbwrFg="
          alt="pic"
        />
      </div>
    </div>
  );
};

export default Login;
