import { Route, Routes } from 'react-router';

import MainPage from './pages/MainPage/MainPage';
import InformationPage from './pages/InformationPage/InformationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/info" element={<InformationPage />} />
        <Route path="/profile/:profileId?" element={<ProfilePage />} />
        <Route path="/profile-settings" element={<ProfilePage />} />
        <Route path="/info/privacy" element={<>Privacy</>} />
        <Route path="/info/terms" element={<>Terms</>} />
        <Route path="/info/site" element={<>Site</>} />
      </Routes>
    </>
  );
};

export default App;
