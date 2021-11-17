import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TopNavbar from './components/TopNavbar';
import SideNavbar from './components/SideNavbar';
import Feed from './components/Feed';
import PinDetail from './components/PinDetail';
import UserProfile from './components/UserProfile';
import CreatePin from './components/CreatePin';

function App() {
  return (
    <Router>
      <div className='flex bg-primary '>
        <div className='fixed hidden sm:block'>
          <SideNavbar />
        </div>

        <div
          style={{
            paddingRight: '10px',
          }}
          className='ml-2 sm:ml-320'
        >
          <TopNavbar />
          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/post-detail' element={<PinDetail />} />
            <Route path='/user-profile' element={<UserProfile />} />
            <Route path='/create-pin' element={<CreatePin />} />
          </Routes>
          {/* </div> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
