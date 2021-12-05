import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

import { AiFillCloseCircle } from 'react-icons/ai';
import { Login, Search, TopNavbar, SideNavbar, Feed, PinDetail, UserProfile, CreatePin, Recent } from './components';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem('user'));

    if (!User) navigate('/login');
  }, []);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen">
      <div className="hidden md:flex h-screen flex-initial">
        <SideNavbar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 mt-2 mb-5 flex flex-row items-center">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/" className="flex gap-2 ml-3 items-center">
            <button type="button" className="bg-red-500 text-white rounded-full p-1 w-8 h-8 font-bold">
              S
            </button>
            <h2 className="font-extrabold text-xl ">ShareMe</h2>
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen shadow-md z-10">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} onClick={() => setToggleSidebar(false)} />
            </div>
            <SideNavbar />
          </div>
        )}
      </div>
      <div className="px-5 pb-2 flex-1 h-screen overflow-y-scroll">
        <div className="bg-gray-50">
          <TopNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="h-full">
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route path="/pin-detail/:pinId" element={<PinDetail />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/create-pin" element={<CreatePin />} />
            <Route path="login" element={<Login />} />
            <Route path="recent" element={<Recent />} />
            <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

