import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TopNavbar, SideNavbar, Feed, PinDetail, UserProfile, CreatePin } from './components';

const App = () => (
  <Router>
    <div className='flex bg-primary '>
      <div className='fixed hidden sm:block'>
        <SideNavbar />
      </div>
      <div style={{ paddingRight: '10px', }} className='ml-2 sm:ml-320'>
        <TopNavbar />
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/post-detail' element={<PinDetail />} />
          <Route path='/user-profile' element={<UserProfile />} />
          <Route path='/create-pin' element={<CreatePin />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
