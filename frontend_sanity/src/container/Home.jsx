import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { SideNavbar, TopNavbar, Feed, CreatePin, PinDetail, UserProfile, Recent, Search } from '../components';

function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  });

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen">
      <div className="hidden md:flex h-screen flex-initial">
        <SideNavbar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 mt-2 pb-5 w-full flex flex-row justify-between items-center">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to={`user-profile/${user?.googleId}`}>
            <img src={user.imageUrl} alt="user-pic" className="w-9 h-9 rounded-full " />
          </Link>
        </div>
        {toggleSidebar && (
        <div className="fixed w-4/5 bg-white h-screen shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <SideNavbar />
        </div>
        )}
      </div>
      <div className="px-2 md:px-5 pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <div className="bg-gray-50">
          <TopNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className="h-full">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/recent" element={<Recent />} />
            <Route path="/pin-detail/:pinId" element={<PinDetail />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/create-pin" element={<CreatePin />} />
            <Route path="/search" element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;
