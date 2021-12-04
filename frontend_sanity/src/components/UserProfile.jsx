import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import Loader from 'react-loader-spinner';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';

const UserProfile = () => {
  const [user, setUser] = useState();
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const navigate = useNavigate();
  const User = JSON.parse(localStorage.getItem('user'));

  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();

    navigate('/login');
  };

  return (
    <div className="pb-2">
      {user ? (
        <div>
          <div className="flex flex-col justify-center items-center">
            <img
              className="rounded-lg lg:w-656 h-370"
              src="https://cdn.dribbble.com/users/2884238/screenshots/16904345/media/d710408a167d4c05172dd1b28a14f178.png?compress=1&resize=1200x900"
              alt="user-pic"
            />
            <img
              className="rounded-full w-28 h-28 m-auto -mt-14 "
              src={user.image}
              alt="user-pic"
            />
          </div>
          <h1 className="font-bold text-3xl text-center mt-3">
            {user.userName}
          </h1>
          <div className="flex items-center justify-center gap-4 mt-5 mb-4">

            {userId === User.googleId && (
              <GoogleLogout
                clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-white p-2 text-2xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <AiOutlineLogout />
                  </button>
                )}
                onLogoutSuccess={logout}
                cookiePolicy="single_host_origin"
              />
            )}
          </div>
          <div className="text-center mb-5">
            <button
              type="button"
              onClick={(e) => setText(e.target.textContent)}
              className="bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none"
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => setText(e.target.textContent)}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none"
            >
              Saved
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
          <Loader
            type="Circles"
            color="#00BFFF"
            height={50}
            width={200}
            className="m-5"
          />
        </div>
      )}
      {pins?.length > 0 ? (
        <MasonryLayout pins={pins} />
      ) : (
        <div className="flex flex-col justify-center font-bold items-center w-full text-1xl mt-2">
          No Pins Found!
        </div>
      )}
    </div>
  );
};

export default UserProfile;
