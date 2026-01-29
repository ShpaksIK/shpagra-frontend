import { Route, Routes } from 'react-router';

import MainPage from './pages/MainPage/MainPage';
import InformationPage from './pages/InformationPage/InformationPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProfileSettingsPage from './pages/ProfileSettingsPage/ProfileSettingsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/info" element={<InformationPage />} />
        <Route path="/profile/:profileId?" element={<ProfilePage />} />
        <Route path="/settings" element={<ProfileSettingsPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/info/privacy" element={<>Privacy</>} />
        <Route path="/info/terms" element={<>Terms</>} />
        <Route path="/info/site" element={<>Site</>} />
      </Routes>
    </>
  );
};

export default App;
