import React from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import { client } from '../client';

const Login = function () {
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
    <div>
      <div className="flex gap-2 mt-12 items-center justify-center">
        <button type="button" className="bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold">
          S
        </button>
        <h2 className="font-extrabold text-xl ">ShareMe</h2>
      </div>
      <div className="mt-6 flex flex-col justify-center items-center gap-5 relative">
        <p className="text-5xl font-semibold mb-4">Sign in to get your ideas</p>
        <div className="absolute bottom-40">
          <GoogleLogin
            clientId="820339122389-20j5josq7739gtnk2giki5ttl43t8nbd.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                type="button"
                className="bg-white p-2 pl-4 pr-4 text-2xl w-300 rounded-3xl flex items-center justify-center text-dark  hover:opacity-95"
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
          src="https://cdn.dribbble.com/users/2884238/screenshots/16904345/media/d710408a167d4c05172dd1b28a14f178.png?compress=1&resize=1200x900"
          alt="pic"
        />
      </div>
    </div>
  );
};

export default Login;
