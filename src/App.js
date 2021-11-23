import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import Feed from './components/Feed';
import PinDetail from './components/PinDetail';
import UserProfile from './components/UserProfile';
import CreatePin from './components/CreatePin';
import Login from './components/Login';
import Search from './components/Search';

// eslint-disable-next-line func-names
const Routing = function () {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem('user'));

    if (!User) {
      navigate('/login');
    }
  }, []);
  return (
    <div className="flex bg-mainColor">
      <div className="fixed hidden sm:block w-275">
        <SideNavbar />
      </div>

      <div
        style={{
          paddingRight: '10px',
          flex: '1',
        }}
        className="ml-2 sm:ml-320"
      >
        <div className="bg-mainColor">
          <TopNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div style={{ minHeight: '99vh' }}>
          <Routes>
            <Route exact path="/" element={<Feed />} />
            <Route path="/pin-detail/:pinId" element={<PinDetail />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/create-pin" element={<CreatePin />} />
            <Route path="login" element={<Login />} />
            <Route
              path="/search"
              element={
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
};

export default App;

